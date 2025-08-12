install:
	npm ci

# Dev server (webpack-dev-server). El runner no abre navegador.
start:
	npm run start

build:
	npm run build

# Linter
lint:
	npx eslint .

# Punto de entrada para pruebas (si el runner lo invoca)
test:
	npm test
