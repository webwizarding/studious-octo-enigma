```
mv studious-octo-enigma portfolio

npm install

cd /home/portfolio
DB="file:/home/portfolio/data.sqlite" NEXT_SKIP_BUILD_STATIC_GENERATION=1 npm ci
DB="file:/home/portfolio/data.sqlite" NEXT_SKIP_BUILD_STATIC_GENERATION=1 npm run build

sudo systemctl enable --now portfolio
sudo systemctl status portfolio --no-pager -n 10
```
