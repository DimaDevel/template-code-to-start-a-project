#!/usr/bin/env sh

set -ea

COMPOSE_HTTP_TIMEOUT=5000
PROJECT_NAME='testblizzz'
TEST=${TEST:-'npm run test'}
TEST_PATH=${TEST_PATH:-'./test/**/*.test.js'}
COMPOSE_FILE='docker-compose.yml'

docker network create testnet || true

docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE kill
docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE rm -f
docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE pull
docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE up -d


docker exec -t "${PROJECT_NAME}_api_1" bash -c "npm run test"
docker logs -f "${PROJECT_NAME}_api_1"
EXIT_CODE=$(docker wait "${PROJECT_NAME}_api_1")

docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE kill
docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE rm -f

exit $EXIT_CODE
