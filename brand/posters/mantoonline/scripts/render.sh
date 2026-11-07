#!/bin/sh
# Render source/poster-*.html (or the files given) to output/*.png at 1080x1920: sh scripts/render.sh [poster-1-phone.html ...]
cd "$(dirname "$0")/../source"; S=$(pwd -W); O=$(cd ../output && pwd -W)
for f in ${@:-poster-*.html}; do
  "C:/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
    --window-size=1080,1920 --virtual-time-budget=8000 --screenshot="$O/${f%.html}.png" "file:///$S/$f" 2>/dev/null
done
