#!/bin/bash
if [[ -z $(git status --porcelain) ]]; then
    exit 0
fi

git config --global user.name github-actions
git remote set-url origin https://x-access-token:$TOKEN@github.com/$REPOSITORY
git add -A
git commit -m "$MESSAGE"
git push
