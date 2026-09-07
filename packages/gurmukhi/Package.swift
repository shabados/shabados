// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "Gurmukhi",
    // Deliberately lower than the Shabad OS app's iOS 26 floor
    // (docs/architecture/decisions/0014-one-app-three-shells.md). This is a
    // general-purpose library published to six ecosystems, so its minimum bounds
    // every consumer, not just ours. Text processing needs nothing recent.
    // **Do not "align" these two numbers** — the build correctly compiles this
    // package at ios16 and the app at ios26.
    platforms: [.macOS(.v13), .iOS(.v16)],
    products: [
        .library(name: "Gurmukhi", targets: ["Gurmukhi"]),
    ],
    targets: [
        // A binary target rather than a systemLibrary: an iOS app cannot link a
        // library it is told to find on the host, and an xcframework is how Apple
        // platforms ship device and Simulator slices that are both arm64. Its macOS
        // slice is what the SmokeTest links, so the dev harness and the app exercise
        // the same artifact.
        //
        // Built, not committed. Run `mise run apple` before opening Xcode or
        // resolving this package -- apps/build.sh does it for you.
        .binaryTarget(
            name: "gurmukhiFFI",
            path: "bindings/swift/gurmukhiFFI.xcframework"
        ),
        .target(
            name: "Gurmukhi",
            dependencies: ["gurmukhiFFI"],
            path: "bindings/swift/Sources/Gurmukhi"
        ),
        .executableTarget(
            name: "SmokeTest",
            dependencies: ["Gurmukhi"],
            path: "bindings/swift/smoke"
        ),
    ]
)
