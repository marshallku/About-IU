#!/bin/bash
response=$(curl "https://www.youtube.com/c/dlwlrma/videos")

echo $response > tmp.txt
node .github/scripts/parse-data.js > public/data/youtube.json
rm tmp.txt

# Commit if possible
if [[ `git status --porcelain` ]]; then
    git config --global user.name 'youtube-updater'
    git remote set-url origin https://x-access-token:$TOKEN@github.com/$REPOSITORY
    git commit -am "Update youtube list"
    git push
fi