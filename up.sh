#!/bin/bash
set -euo pipefail

if [ $# -eq 0 ]; then
  echo "Usage: ./up.sh <commit message>" >&2
  exit 1
fi

git pull
npm run build
git add .
git commit -m "$*" || echo "Nothing to commit, continuing..."
git push
git ftp push --syncroot dist/ --remote-root /richard-wezel.de/
