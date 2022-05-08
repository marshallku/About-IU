#!/bin/bash
response=$(curl --header "Accept-Language: ko-KR" "https://www.youtube.com/c/dlwlrma/videos")|| exit 1

echo $response > tmp.txt
node .github/scripts/parse-data.js > public/data/youtube.json
rm tmp.txt