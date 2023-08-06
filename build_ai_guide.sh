#!/bin/bash

ROOT_PATH="templates/ai/content"
echo ">>>> Building AI Guide from $ROOT_PATH ..."

# test if command `marked` exists
if ! command -v marked &> /dev/null
then
    echo "marked could not be found"
    echo "Installing marked..."

    npm install -g marked
fi

find $ROOT_PATH -name "*.md" | while read -r file; 
    do echo ">>>> Building $file"; 
    echo
    marked -o "${file%.md}.html" "$file";
    echo 
done