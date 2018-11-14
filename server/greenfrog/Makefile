install:
	npm install

start:
	npx gulp dev

build:
	NODE_ENV=production npx gulp prod

webpack_bundle:
	NODE_ENV=production npx webpack-cli

lint:
	npx eslint server;
	npx eslint client;

lint-fix:
	npx eslint --fix server;
	npx eslint --fix client;

migrate:
	npx sequelize db:migrate

migrate-undo:
	npx sequelize db:migrate:undo
