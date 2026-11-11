import java.util.Properties

plugins {
  alias(libs.plugins.android.application)
  alias(libs.plugins.compose)
}

/**
 * The newest Android platform actually installed, as (major, minor).
 *
 * Inferred rather than hardcoded so this builds on any machine and survives an SDK
 * update without an edit. It matters because minor SDK releases exist: the platform
 * here is `android-36.1`, and a literal `compileSdk = 36` resolves to
 * `platforms/android-36`, which is not installed.
 */
val compileTarget: Pair<Int, Int> = run {
  val sdkDir = sequenceOf(
    rootProject.file("local.properties")
      .takeIf(File::exists)
      ?.let { f -> Properties().apply { f.inputStream().use(::load) }.getProperty("sdk.dir") },
    System.getenv("ANDROID_HOME"),
    System.getenv("ANDROID_SDK_ROOT"),
  ).filterNotNull().map(::File).firstOrNull(File::isDirectory)
    ?: error("No Android SDK — set sdk.dir in local.properties, or ANDROID_HOME")

  val platform = Regex("""^android-(\d+)(?:\.(\d+))?$""")
  File(sdkDir, "platforms").listFiles().orEmpty()
    .mapNotNull { platform.find(it.name)?.destructured }
    .map { (major, minor) -> major.toInt() to (minor.takeIf(String::isNotEmpty)?.toInt() ?: 0) }
    .maxWithOrNull(compareBy({ it.first }, { it.second }))
    ?: error("No Android platform installed under $sdkDir/platforms")
}

/**
 * Upload-key credentials, read from the gitignored local.properties so no secret is
 * committed. The key is the one registered in Play Console as the upload key (see
 * README "Signing"). Play rejects an upload signed with any other key.
 * Absent on machines without the key, in which case release builds stay unsigned.
 */
val uploadKey: Properties? = rootProject.file("local.properties")
  .takeIf(File::exists)
  ?.let { f -> Properties().apply { f.inputStream().use(::load) } }
  ?.takeIf { it.getProperty("upload.storeFile") != null }

android {
  namespace = "com.shabados.android"

  signingConfigs {
    if (uploadKey != null) {
      create("upload") {
        storeFile = rootProject.file(uploadKey.getProperty("upload.storeFile"))
        storePassword = uploadKey.getProperty("upload.storePassword")
        keyAlias = uploadKey.getProperty("upload.keyAlias")
        keyPassword = uploadKey.getProperty("upload.keyPassword")
      }
    }
  }

  // compileSdk is a toolchain detail — which SDK jar we compile against — so it is
  // inferred from the machine.
  compileSdk = compileTarget.first
  if (compileTarget.second > 0) {
    compileSdkMinor = compileTarget.second
  }

  defaultConfig {
    // Matches the existing store listings, read from the legacy Expo app's
    // config/environment/config.latest.ts. Changing it publishes a new app and
    // forfeits the listing. `com.shabados.next.app` was the beta channel.
    applicationId = "com.shabados.app"
    // 36 (Android 16), decided 2026-09-02, knowing it reaches ~7.5% of devices today.
    // Deliberate: it buys variable-font control (35) and progress-centric
    // notifications (36) — Live Updates, which is how a sehaj paath goal and a Nitnem
    // completion reach the shade — and this app is built once to last, not maintained
    // continuously against a widening compatibility matrix. The share climbs on its
    // own; the maintenance cost of supporting Android 8 never would have.
    // See docs/interaction.md#platform-targets.
    minSdk = 36
    // targetSdk is NOT inferred. It changes runtime behaviour, so deriving it from
    // whatever SDK a build machine happens to have would make the shipped APK
    // depend on where it was built. It needs no installed platform — it is a
    // declaration. Confirm against Play's current requirement before submitting.
    targetSdk = 36
    // Play rejects a versionCode at or below any it has seen. The legacy Expo app
    // reached 86 (named 0.2.0, testing tracks only), so this continues from there.
    versionCode = 87
    versionName = "0.3.0"
  }

  buildTypes {
    release {
      // R8 on (2026-10-19), for its optimisation of Compose's code more than for
      // shrinking. Checked on a Pixel 7a: launch, readers, both pronunciations
      // (the JNA bindings), tap scroll, Journeys, rotation. Keep rules for what is reached only by reflection are in
      // proguard-rules.pro; a missing one crashes release where debug does not.
      isMinifyEnabled = true
      proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
      signingConfig = signingConfigs.findByName("upload")
    }
  }

  buildFeatures { compose = true }

  testOptions {
    // Robolectric reads the merged manifest and resources, as the app would.
    unitTests.isIncludeAndroidResources = true
    unitTests.all { test ->
      test.inputs.files(robolectricSdk)
      test.systemProperty("robolectric.offline", "true")
      test.systemProperty("robolectric.dependency.dir", robolectricSdk.singleFile.parent)
      // Robolectric's Android 16 sets up shared memory through a JDK-internal
      // package, which JDK 17 and later do not open to other code by default.
      test.jvmArgs("--add-opens=java.base/jdk.internal.access=ALL-UNNAMED")
    }
  }

  // No kotlinOptions block: AGP 9's built-in Kotlin removed it from the android
  // extension (it survives only on the Multiplatform DSL), and there is no
  // replacement there — ApplicationExtension exposes compileOptions and
  // enableKotlin, nothing for jvmTarget. Kotlin follows compileOptions.
  compileOptions {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
  }

  // packages/gurmukhi's generated Kotlin bindings, compiled straight from where
  // `mise run android` (in that package) writes them — never copied in, same
  // reason DesignTokens.kt/AppIcons.kt are generated fresh rather than hand-kept
  // in sync: a stale copy here would compile against a wrapper for a Rust API
  // that no longer exists. jniLibs/ needs no equivalent entry — that directory
  // name is AGP's own convention and is picked up automatically.
  sourceSets {
    getByName("main") {
      kotlin.srcDirs("../../../packages/gurmukhi/bindings/kotlin/lib")
    }
  }
}

/**
 * The Android 16 framework Robolectric runs tests against, resolved by Gradle like any
 * other pinned dependency and handed to Robolectric in offline mode. Left to itself,
 * Robolectric downloads it at test time, outside Gradle's cache and `--offline`.
 * Its version must be one this Robolectric release expects: when updating
 * `robolectric`, take the SDK 36 jar named in its release notes.
 */
val robolectricSdk: Configuration by configurations.creating

dependencies {
  implementation(platform(libs.androidx.compose.bom))
  implementation(libs.androidx.compose.ui)
  implementation(libs.androidx.compose.ui.tooling.preview)
  implementation(libs.androidx.compose.material3)
  implementation(libs.androidx.activity.compose)
  implementation(libs.androidx.navigation3.ui)
  debugImplementation(libs.androidx.compose.ui.tooling)

  // Test-only, never shipped. JUnit 4 is what AGP's JVM unit-test task runs without
  // further setup, and it has been stable for a decade; if it were abandoned the
  // pinned version keeps working, since it needs nothing from outside the JVM. Most
  // tests in src/test pin rules held in plain Kotlin (ReaderSize.kt, Shell.kt), with
  // no Android types, so they need nothing more.
  testImplementation(libs.junit)

  // The gesture matrix (GestureMatrixTest): Compose UI tests that drive real touches
  // through the shell's own pointer handling, chosen by the author 2026-11-04 over
  // instrumented tests so that they run on every build, on any machine, with no
  // device. `ui-test-junit4` is Compose's test rule and `performTouchInput`;
  // driving Compose's pointer input without it would mean rebuilding that harness.
  // Robolectric runs it on the JVM. If Robolectric is abandoned, the tests are
  // ordinary Compose UI tests and move to src/androidTest unchanged.
  // `ui-test-manifest` declares the empty activity the rule hosts content in; it is
  // debug-only, so release never carries it.
  testImplementation(platform(libs.androidx.compose.bom))
  testImplementation(libs.androidx.compose.ui.test.junit4)
  testImplementation(libs.robolectric)
  debugImplementation(libs.androidx.compose.ui.test.manifest)
  robolectricSdk(libs.robolectric.android.all)

  // No JSON library: org.json is in the platform and the payload is a few nested
  // arrays. kotlinx-serialization would add a dependency and a Gradle plugin whose
  // version has to track Kotlin's, for about twenty lines of parsing.

  // UniFFI's generated Kotlin calls into the native library through JNA, not a
  // hand-written JNI layer. `@aar`, not the plain jar `bindings/kotlin`'s own
  // build.gradle.kts uses for its JVM smoke test — JNA ships an Android-specific
  // artifact that bundles its own tiny native helper per ABI; the plain jar
  // targets desktop JVMs and does not load on-device. Version matches
  // bindings/kotlin's, kept in step by hand since nothing generates this line.
  implementation("net.java.dev.jna:jna:5.17.0@aar")
}
