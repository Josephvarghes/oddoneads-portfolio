# build-apk.ps1 - Automated Android Build Environment & Compiler Script
$ErrorActionPreference = "Stop"

$workspaceDir = "c:\Users\user\OneDrive\Desktop\odd_one"
$sdkDir = "$workspaceDir\.android-sdk"
$gradleDir = "$workspaceDir\.gradle-dist"
$androidProjDir = "$workspaceDir\android"

# 1. Verify Java Installation
Write-Host "--- Checking Java JDK Installation ---"
if ($env:JAVA_HOME) {
    Write-Host "JAVA_HOME is set to: $env:JAVA_HOME"
} else {
    $env:JAVA_HOME = "C:\Program Files\Java\jdk-17.0.1"
    Write-Host "Setting JAVA_HOME to default path: $env:JAVA_HOME"
}

$javaPath = Join-Path $env:JAVA_HOME "bin\java.exe"
if (-not (Test-Path $javaPath)) {
    Write-Error "Java executable not found at $javaPath. Please check if Java is installed correctly."
}
Write-Host "Java compiler / runtime verified."

# 2. Download and Setup Android SDK Command-Line Tools
Write-Host "`n--- Setting up Android SDK CLI Tools ---"
if (-not (Test-Path $sdkDir)) {
    New-Item -ItemType Directory -Path $sdkDir | Out-Null
}

$cmdlineToolsZip = "$sdkDir\commandlinetools.zip"
$cmdlineToolsDest = "$sdkDir\cmdline-tools"

if (-not (Test-Path "$cmdlineToolsDest\latest\bin\sdkmanager.bat")) {
    Write-Host "Downloading Android SDK Command-Line Tools (approx. 100MB)..."
    curl.exe -L -o $cmdlineToolsZip "https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip"
    
    Write-Host "Extracting SDK tools..."
    Expand-Archive -Path $cmdlineToolsZip -DestinationPath "$sdkDir\temp_extract" -Force
    
    if (-not (Test-Path $cmdlineToolsDest)) {
        New-Item -ItemType Directory -Path $cmdlineToolsDest | Out-Null
    }
    
    # Setup standard cmdline-tools/latest structure
    Move-Item -Path "$sdkDir\temp_extract\cmdline-tools" -Destination "$cmdlineToolsDest\latest" -Force
    Remove-Item -Path "$sdkDir\temp_extract" -Recurse -Force
    Remove-Item -Path $cmdlineToolsZip -Force
    Write-Host "Android Command-Line Tools setup successfully."
} else {
    Write-Host "Android Command-Line Tools already exists."
}

# 3. Accept Licenses (Pre-writing hashes prevents interactive prompt blocking)
Write-Host "`n--- Populating Android SDK License Agreements ---"
$licensesDir = "$sdkDir\licenses"
if (-not (Test-Path $licensesDir)) {
    New-Item -ItemType Directory -Path $licensesDir | Out-Null
}
# Pre-writing known license hashes for Platforms & Build-Tools
Set-Content -Path "$licensesDir\android-sdk-license" -Value "89aaac167a481b74965358b858f285b8764102dd`n84831b9409646a918e30573bab4c9c91346d8abd`n504667652884f6cb2f24b0d9e8c557ae951d9536`nbdf5a6275d787076e1593e31c662f9124e9b00e3" -NoNewline
Set-Content -Path "$licensesDir\android-sdk-preview-license" -Value "84831b9409646a918e30573bab4c9c91346d8abd" -NoNewline
Write-Host "Licenses pre-approved."

# Configure environment pathing
$env:ANDROID_HOME = $sdkDir
$sdkManager = "$cmdlineToolsDest\latest\bin\sdkmanager.bat"

# 4. Install Platforms and Build-Tools
Write-Host "`n--- Downloading SDK Platform 34 and Build-Tools (approx. 150MB) ---"
if (-not (Test-Path "$sdkDir\platforms\android-34")) {
    & $sdkManager "platforms;android-34" "build-tools;34.0.0"
    Write-Host "Platform download complete."
} else {
    Write-Host "Platform and build tools already installed."
}

# 5. Download and Setup Gradle 8.5
Write-Host "`n--- Checking Gradle Setup ---"
if (-not (Test-Path $gradleDir)) {
    New-Item -ItemType Directory -Path $gradleDir | Out-Null
}

$gradleZip = "$gradleDir\gradle.zip"
$gradleBin = "$gradleDir\gradle-8.5\bin\gradle.bat"

if (-not (Test-Path $gradleBin)) {
    Write-Host "Downloading Gradle 8.5 (approx. 120MB)..."
    curl.exe -L -o $gradleZip "https://services.gradle.org/distributions/gradle-8.5-bin.zip"
    
    Write-Host "Extracting Gradle files..."
    Expand-Archive -Path $gradleZip -DestinationPath $gradleDir -Force
    Remove-Item -Path $gradleZip -Force
    Write-Host "Gradle compiler setup completed."
} else {
    Write-Host "Gradle setup already verified."
}

# 6. Compile Project
Write-Host "`n--- Executing Gradle Build ---"
Push-Location $androidProjDir
try {
    Write-Host "Invoking gradle assembleDebug..."
    & $gradleBin clean assembleDebug --no-daemon
    Write-Host "Gradle build completed successfully."
} catch {
    Write-Error "Gradle build failed: $_"
} finally {
    Pop-Location
}

# 7. Copy Output APK to Root
$apkSource = "$androidProjDir\app\build\outputs\apk\debug\app-debug.apk"
$apkDest = "$workspaceDir\oddoneads-debug.apk"

if (Test-Path $apkSource) {
    Copy-Item -Path $apkSource -Destination $apkDest -Force
    Write-Host "`n========================================================"
    Write-Host " SUCCESS! Android APK built successfully at:"
    Write-Host "  $apkDest"
    Write-Host "========================================================"
} else {
    Write-Error "Build finished, but failed to locate generated APK at $apkSource."
}
