Write-Host "Starting AI Vision Development Server..." -ForegroundColor Green
Write-Host ""

# Change to the project root directory if we're in a subdirectory
if (Test-Path "client") {
    Write-Host "Already in project root directory"
} elseif (Test-Path "../server") {
    Write-Host "Moving to project root directory..."
    Set-Location ".."
} else {
    Write-Host "Error: Cannot find project structure. Make sure you're in the project directory." -ForegroundColor Red
    exit 1
}

$env:NODE_ENV = "development"
npx tsx server/index.ts