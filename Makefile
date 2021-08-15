#
# vim:ft=make
# Makefile


help:  ## these help instructions
	@sed -rn 's/^([a-zA-Z_-]+):.*?## (.*)$$/"\1" "\2"/p' < $(MAKEFILE_LIST)|xargs printf "make %-20s# %s\n"

clear: ## destroys the docker environment.
	docker-compose down --rmi all -v --remove-orphans

up-backend-local: ## starts all docker containers
	docker-compose -f docker-compose.yml -f server/docker-compose.local.yml up -d

up-frontend-local:
	cd client && docker-compose -f docker-compose.local.yml up --force-recreate

down: ## shuts down all docker containers
	docker stop $(docker ps -a -q)