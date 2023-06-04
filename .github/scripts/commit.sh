#!/bin/bash
github_env="$1"

if [[ -z $(git status --porcelain) ]]; then
    echo 'status=FALSE' >>"$github_env"
    exit 0
fi

echo 'status=TRUE' >>"$github_env"

git config user.name github-actions[bot]
git config user.email 41898282+github-actions[bot]@users.noreply.github.com
git remote set-url origin "https://x-access-token:$TOKEN@github.com/$REPOSITORY"
git add -A
git commit -m "$MESSAGE"
git push
