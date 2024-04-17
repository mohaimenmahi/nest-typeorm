build:
	COMPOSE_DOCKER_CLI_BUILD=1  DOCKER_BUILDKIT=1 docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

dev: down up log

enter:
	docker exec -it nest-app sh

log:
	docker logs --follow nest-app

log-db:
	docker logs --follow dev-db