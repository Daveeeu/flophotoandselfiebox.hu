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

# SQLite needs a writable database file inside the container.
# Otherwise Laravel's DB-backed sessions/migrations will fail with "attempt to write a readonly database".
if [ "${DB_CONNECTION:-}" = "sqlite" ]; then
  mkdir -p database

  # Typical values: "database/database.sqlite" or "/var/www/html/database/database.sqlite"
  DB_PATH="${DB_DATABASE:-database/database.sqlite}"
  case "$DB_PATH" in
    /*) : ;;
    *) DB_PATH="/var/www/html/$DB_PATH" ;;
  esac

  # Ensure the file exists and is writable by the web user.
  if [ ! -f "$DB_PATH" ]; then
    touch "$DB_PATH"
  fi

  chown -R www-data:www-data database
  chmod -R u+rwX,g+rwX database
fi

chown -R www-data:www-data storage bootstrap/cache

php artisan storage:link --force >/dev/null 2>&1 || true

php artisan migrate --force
php artisan db:seed --class=Database\\Seeders\\AdminUserSeeder --force
php artisan optimize:clear
php artisan optimize

exec "$@"
