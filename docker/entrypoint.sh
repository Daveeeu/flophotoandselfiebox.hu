#!/bin/sh
set -eu

cd /var/www/html

mkdir -p \
  storage/app/public \
  storage/framework/cache/data \
  storage/framework/sessions \
  storage/framework/views \
  storage/logs \
  bootstrap/cache

chown -R www-data:www-data storage bootstrap/cache

php artisan storage:link --force >/dev/null 2>&1 || true

php artisan migrate --force
php artisan db:seed --class=Database\\Seeders\\AdminUserSeeder --force
php artisan optimize:clear
php artisan optimize

exec "$@"
