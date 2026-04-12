# Flophoto deploy

Production deploy a meglévő Docker host modellre készült.

## Fájlok

- `.env.production`
- `docker-compose.prod.yml`
- `Dockerfile`

## Lokális build

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml build
```

## Szerver oldali indítás

```bash
cd /srv/apps/flophoto
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build
```

## Ellenőrzés

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml ps
docker compose --env-file .env.production -f docker-compose.prod.yml logs -f
curl -fsS https://flophoto.jandldavid.hu/up
```
