#!/bin/bash

send_discord_notification() {
    local title="$1"
    local description="$2"

    local json_payload

    json_payload=$(
        cat <<EOF
{
  "embeds": [
    {
      "type": "rich",
      "title": "$title",
      "description": "$description",
      "color": 16007990,
      "fields": [
        {
          "name": "Repository",
          "value": "https://github.com/marshallku/About-IU"
        }
      ],
      "footer": {
        "text": "$(date)"
      }
    }
  ]
}
EOF
    )

    curl \
        -H "Content-Type: application/json" \
        -d "$json_payload" \
        "$DISCORD_WEBHOOK_URI"
}
