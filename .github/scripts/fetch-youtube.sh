#!/bin/bash
response=$(curl --header "Accept-Language: ko-KR" "https://www.youtube.com/c/dlwlrma/videos") || exit 1

. .github/scripts/send-notification.sh

echo "$response" >tmp.txt
data=$(node .github/scripts/parse-data.js)

if [ -z "$data" ]; then
    send_discord_notification 'Github Actions failed' 'Failed to update youtube video list'
    exit 1
fi

echo "$data" >public/data/youtube.json
rm tmp.txt
