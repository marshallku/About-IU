#!/bin/bash
if [[ -z $(git status --porcelain) ]]; then
    echo 'status=FALSE' >>"$github_env"
    exit 0
fi

github_env="$1"

echo 'status=TRUE' >>"$github_env"

git config --global user.name github-actions
git remote set-url origin "https://x-access-token:$TOKEN@github.com/$REPOSITORY"
git add -A
git commit -m "$MESSAGE"
git push
