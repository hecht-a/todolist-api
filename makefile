isDocker := $(shell docker info > /dev/null 2>&1 && echo 1)
serviceName := node

ifeq ($(isDocker), 1)
	dc := docker-compose
	de := docker-compose exec --user root $(serviceName)
	na := $(de) node ace
	node := $(de) node
	yarn := $(de) yarn
else
	sy := node ace
	node :=
endif

.DEFAULT_GOAL := help

ARGUMENTS = $(filter-out $@, $(MAKECMDGOALS))

.PHONY: help
help: ## affiche l'aide
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: nahelp
na: ## permet d'utiliser node ace
	$(na) $(ARGUMENTS)

.PHONY: docs
docs: ## génère la doc swagger
	$(na) docs:generate

.PHONY: install
install: package.json ## installe les modules
	$(yarn)

.PHONY: serve
serve: ## lance le serveur Adonis
	$(na) serve --watch

.PHONY: migrate
migrate: database/migrations ## lance les migrations
	$(na) migration:run

.PHONY: rollback
rollback: database/migrations ## annule les migrations
	$(na) migration:rollback

.PHONY: format
format: .eslintrc.json .prettierrc ## formate le code avec eslint et prettier
	npm run lint
	npm run format

.PHONY: configure
configure: ## installe et configure un package Adonis
	$(yarn) add $(ARGUMENTS)
	$(na) configure $(ARGUMENTS)

.PHONY: controller
controller: ## créer un controller
	$(na) make:controller $(ARGUMENTS)

.PHONY: model
model: ## créer un model
	$(na) make:model $(ARGUMENTS)

.PHONY: view
view: ## créer une vue
	$(na) make:view $(ARGUMENTS)

.PHONY: component
component: ## créer un component
	$(na) make:view components/$(ARGUMENTS)

.PHONY: layout
layout: ## créer un layout
	$(na) make:view layouts/$(ARGUMENTS)

.PHONY: validator
validator: ## créer un validateur
	$(na) make:validator $(ARGUMENTS)

.PHONY: routes
routes: ## affiche les routes
	$(na) list:routes

.PHONY: migration
migration: ## créer une migration
	$(na) make:migration $(ARGUMENTS)

.PHONY: add
add: ## installe un package
	$(yarn) add $(ARGUMENTS)

# -----------------------------------
# Arguments
# -----------------------------------
%:
	@:
