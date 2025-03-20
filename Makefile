MAKEFLAGS += --silent --keep-going

DOCKER_COMPOSE_LOCAL = $(shell echo ".docker/docker-compose.local.yml")
DOCKER_COMPOSE_TEST = $(shell echo ".docker/docker-compose.ci.yml")

ENV_FILE_LOCAL = $(shell echo ".env.local")
ENV_FILE_TEST = $(shell echo ".env.test")

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

########################################################################################
####                            Test Environment                              		####
########################################################################################
.PHONY: docker-run-test docker-down-test

docker-run-test:
	@docker compose \
		--file $(DOCKER_COMPOSE_TEST) \
		--project-directory . \
		--env-file ${ENV_FILE_TEST} \
		up \
		--exit-code-from server_test

docker-down-test:
	@docker compose \
		--file $(DOCKER_COMPOSE_TEST) \
		--project-directory . \
		--env-file ${ENV_FILE_TEST} \
 		down --remove-orphans -v --rmi local
	@echo "[INFO] Test instance was successfully downed."