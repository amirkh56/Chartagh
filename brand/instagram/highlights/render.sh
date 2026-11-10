#!/bin/sh
# Render the three highlight stories (1080x1920) next to this file: sh render.sh
cd "$(dirname "$0")"; D=$(pwd -W)
for k in work services contact; do
  "C:/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
    --window-size=1080,1920 --virtual-time-budget=3000 --screenshot="$D/highlight-$k.png" "file:///$D/highlight.html#$k" 2>/dev/null
done
