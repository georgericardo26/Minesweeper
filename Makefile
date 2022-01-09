#
# vim:ft=make
# Makefile
#
.DEFAULT_GOAL := help
.PHONY: setup help

# Paths
TEMP_FOLDER := "misc"

help:  ## these help instructions
	@sed -rn 's/^([a-zA-Z_-]+):.*?## (.*)$$/"\1" "\2"/p' < $(MAKEFILE_LIST)|xargs printf "make %-20s# %s\n"

# hidden: # example undocumented, for internal usage only
# 	@true

# setup: ## sets up the development environment. Must have access to the company's VPN in oder for this to work properly
# 	docker-compose build

# clear: ## destroys the docker environment.
# 	@echo "clear"

up-backend-local: ## starts all docker containers
	sudo docker-compose -f docker-compose.yml -f server/docker-compose.local.yml up -d

up-frontend-local:
	docker-compose -f docker-compose.yml -f client/docker-compose.local.yml up -d

up-dev: ## starts all docker containers
	@echo "up"

down: ## shuts down all docker containers
	@echo "down"