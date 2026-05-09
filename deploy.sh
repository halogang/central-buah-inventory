#!/bin/bash

cd ~/central-buah-inventory

git pull

rm -rf ~/public_html/build
cp -r ~/central-buah-inventory/public/build ~/public_html/

php artisan optimize:clear