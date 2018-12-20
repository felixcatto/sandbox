install:
	npm install

start:
	npx gulp dev

build:
	NODE_ENV=production npx gulp prod

start-production: build
	NODE_ENV=test node dist/bin/server.js

webpack-bundle:
	NODE_ENV=production npx webpack-cli

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

migrate:
	npx typeorm migration:run

migrate-undo:
	npx typeorm migration:revert

generate-migration: build
	npx typeorm migration:generate -n New

console:
	npx gulp console
