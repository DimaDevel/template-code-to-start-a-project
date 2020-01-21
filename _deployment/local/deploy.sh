#!/usr/bin/env sh

set -e

PROJECT_NAME='api'

docker network create common || true

docker-compose --project-name $PROJECT_NAME kill
docker-compose --project-name $PROJECT_NAME rm -f
docker-compose --project-name $PROJECT_NAME pull
docker-compose --project-name $PROJECT_NAME up -d --build
