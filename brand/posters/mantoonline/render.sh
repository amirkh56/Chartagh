#!/bin/sh
# Render each poster-*.html to a 1080x1920 PNG: sh render.sh
cd "$(dirname "$0")"; D=$(pwd -W)
for f in poster-*.html; do
  "C:/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
    --window-size=1080,1920 --virtual-time-budget=3000 --screenshot="$D/${f%.html}.png" "file:///$D/$f" 2>/dev/null
done
