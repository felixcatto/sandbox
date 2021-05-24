install:
	npm install

start:
	npx gulp dev

build:
	NODE_ENV=production npx gulp prod

start-production: build
	NODE_ENV=test node dist/bin/server.js

webpack-bundle:
	NODE_ENV=production npx webpack

webpack-bundle-analyze:
	NODE_ENV=production ANALYZE=true npx webpack

generate-dependencies:
	madge --exclude '(^dist/*|d.ts)' --extensions 'js,ts,tsx' --image g.svg .

lint:
	npx eslint --ext '.js,.jsx,.ts,.tsx' --quiet .

lint-fix:
	npx eslint --ext '.js,.jsx,.ts,.tsx' --quiet --fix .

lint-with-warn:
	npx eslint --ext '.js,.jsx,.ts,.tsx' .

check-types:
	npx tsc
