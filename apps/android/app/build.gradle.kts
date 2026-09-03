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

android {
  namespace = "com.shabados.android"

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
    versionCode = 1
    versionName = "0.1.0"
  }

  buildTypes {
    release {
      // No shrinking: there is nothing to shrink yet, and an unverified ProGuard
      // config is a way to ship a release build that crashes where debug does not.
      isMinifyEnabled = false
    }
  }

  buildFeatures { compose = true }

  // No kotlinOptions block: AGP 9's built-in Kotlin removed it from the android
  // extension (it survives only on the Multiplatform DSL), and there is no
  // replacement there — ApplicationExtension exposes compileOptions and
  // enableKotlin, nothing for jvmTarget. Kotlin follows compileOptions.
  compileOptions {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
  }
}

dependencies {
  implementation(platform(libs.androidx.compose.bom))
  implementation(libs.androidx.compose.ui)
  implementation(libs.androidx.compose.ui.tooling.preview)
  implementation(libs.androidx.compose.material3)
  implementation(libs.androidx.activity.compose)
  debugImplementation(libs.androidx.compose.ui.tooling)

  // No JSON library: org.json is in the platform and the payload is a few nested
  // arrays. kotlinx-serialization would add a dependency and a Gradle plugin whose
  // version has to track Kotlin's, for about twenty lines of parsing.
}
