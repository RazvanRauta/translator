MAKEFLAGS += --silent --keep-going

DOCKER_COMPOSE_LOCAL = $(shell echo ".docker/docker-compose.local.yml")

ENV_FILE_LOCAL = $(shell echo ".env.local")

########################################################################################
####                               Local Environment                                ####
########################################################################################
.PHONY: docker-build-local docker-run-local docker-run-attach-local docker-down-local

docker-build-local:
	@docker compose \
 		--file $(DOCKER_COMPOSE_LOCAL) \
		--project-directory . \
		--env-file ${ENV_FILE_LOCAL} \
 		build \
		--no-cache
	@echo "[INFO] Local instance was successfully built!"

docker-run-local:
	@docker compose \
		--file $(DOCKER_COMPOSE_LOCAL) \
		--project-directory . \
		--env-file ${ENV_FILE_LOCAL} \
		up \
		--detach
	@echo "[INFO] Local instance was successfully started!"

docker-run-attach-local:
	@docker compose \
		--file $(DOCKER_COMPOSE_LOCAL) \
		--project-directory . \
		--env-file ${ENV_FILE_LOCAL} \
		up
	@echo "[INFO] Local instance was successfully started and attached!"

docker-down-local:
	@docker compose \
		--file $(DOCKER_COMPOSE_LOCAL) \
		--project-directory . \
		--env-file ${ENV_FILE_LOCAL} \
 		down --remove-orphans -v
	@echo "[INFO] Local instance was successfully downed."

