#!/bin/bash

. .github/scripts/send-notification.sh

title=''
message=''

while [[ $# -gt 0 ]]; do
    case "$1" in
    -t | --title)
        title="$2"
        shift 2
        ;;
    -m | --message)
        message="$2"
        shift 2
        ;;
    *)
        echo "Unknown argument: $1"
        exit 1
        ;;
    esac
done

send_discord_notification "${title:-Github actions alert}" "$message"
