#!/bin/bash

# Directory to watch (change if needed)
WATCH_DIR="."

cd "$WATCH_DIR" || exit 1

echo "Watching $WATCH_DIR for changes..."

while inotifywait -r -e modify,create,delete,move .; do
    git add .
    git commit -m "in the mist of doing hard things by ingchrist: file/folder change detected"
    git push
    echo "Changes pushed to GitHub."
    sleep 10 # <--- Added: Sleep for 10 seconds after each push
    echo "Resuming watch after 10-second pause."
done
