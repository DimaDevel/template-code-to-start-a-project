#!/usr/bin/env sh

docker network create public || true

docker-compose kill
docker-compose rm -f
docker-compose up -d --build
