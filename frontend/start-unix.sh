#!/bin/bash
echo "Starting AI Vision Development Server..."
echo

# Change to the project root directory if we're in a subdirectory
if [ -d "client" ]; then
    echo "Already in project root directory"
elif [ -d "../server" ]; then
    echo "Moving to project root directory..."
    cd ..
else
    echo "Error: Cannot find project structure. Make sure you're in the project directory."
    exit 1
fi

NODE_ENV=development npx tsx server/index.ts