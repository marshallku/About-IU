#!/bin/bash
if [[ `git status --porcelain` ]]; then
    git config --global user.name github-actions
    git remote set-url origin https://x-access-token:$TOKEN@github.com/$REPOSITORY
    git add -A
    git commit -m "$MESSAGE"
    git push
fi