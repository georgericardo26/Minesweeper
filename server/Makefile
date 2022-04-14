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

up: ## starts all docker containers
	docker-compose -f docker-compose.local.yml up -d

down: ## shuts down all docker containers
	docker-compose -f docker-compose.local.yml down