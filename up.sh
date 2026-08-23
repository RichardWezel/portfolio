git pull
ng build
git add .
git commit -m "$*"
git push
git ftp push --syncroot dist/ --remote-root /richard-wezel.de/