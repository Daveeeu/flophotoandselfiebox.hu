# Flophoto Selfiebox

Laravel backend + Inertia/React frontend egy alkalmazásban.

## Funkciók

- publikus landing oldal Reacttel
- kapcsolatfelvételi űrlap adatbázis mentéssel
- foglalási űrlap eseményadatokkal és státuszkezeléssel
- admin felület kapcsolatfelvételekhez, foglalásokhoz és galéria képekhez
- képfeltöltés vagy külső kép URL kezelése
- seedelt admin user és minta galéria

## Indítás

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
npm run build
php artisan serve
```

Fejlesztéshez a frontend külön is futtatható:

```bash
npm run dev
```

Vagy egyetlen fejlesztői indítással:

```bash
composer dev
```

## Admin belépés

Alapértelmezett seedelt admin adatok az `.env` alapján:

- email: `admin@flophoto.hu`
- jelszó: `ChangeMe123!`

Ezeket érdemes azonnal átírni.

## Fontos route-ok

- publikus oldal: `/`
- admin: `/admin`
- belépés: `/login`

## Ellenőrzött parancsok

```bash
php artisan migrate:fresh --seed
php artisan test
npm run build
```
