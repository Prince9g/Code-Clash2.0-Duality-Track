@echo off
echo Starting AI Vision Development Server...
echo.

:: Change to the project root directory if we're in a subdirectory
if exist "client" (
    echo Already in project root directory
) else if exist "..\server" (
    echo Moving to project root directory...
    cd ..
) else (
    echo Error: Cannot find project structure. Make sure you're in the project directory.
    pause
    exit /b 1
)

set NODE_ENV=development && npx tsx server/index.ts