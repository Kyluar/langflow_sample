.PHONY: fresh-build build up start stop remove logs clean help fresh-api-build fresh-web-build api-build web-build

DATABASE_ENV_PATH := .env.database.production
API_ENV_PATH := ./apps/api/.env.production
BASE := docker-compose --env-file $(DATABASE_ENV_PATH) --env-file $(API_ENV_PATH) -f docker-compose.yml

fresh-build:
	$(BASE) build --no-cache

build:
	$(BASE) build

up:
	$(BASE) up -d

start:
	$(BASE) start

stop:
	$(BASE) stop

down:
	$(BASE) down

logs:
	$(BASE) logs -f

clean:
	$(BASE) down -v --remove-orphans

fresh-api-build:
	$(BASE) build ctd-resource-api --no-cache

fresh-web-build:
	$(BASE) build ctd-resource-web --no-cache

api-build:
	$(BASE) build ctd-resource-api

web-build:
	$(BASE) build ctd-resource-web

help:
	@echo "Comandos disponíveis:"
	@echo "  fresh-build     : Build completo sem cache"
	@echo "  build           : Build incremental com cache"
	@echo "  up              : Cria e inicia os containers"
	@echo "  start           : Inicia os containers"
	@echo "  stop            : Para os containers"
	@echo "  down            : Remove containers e redes"
	@echo "  logs            : Mostra logs em tempo real"
	@echo "  clean           : Limpa todos os recursos"
	@echo "  fresh-api-build : Build da API sem cache"
	@echo "  fresh-web-build : Build da Web sem cache"
	@echo "  api-build       : Build da API"
	@echo "  web-build       : Build da Web"
