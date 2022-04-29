#!/bin/bash
response=$(curl "https://www.youtube.com/c/dlwlrma/videos")|| exit 1

echo $response > tmp.txt
node .github/scripts/parse-data.js > public/data/youtube.json
rm tmp.txt