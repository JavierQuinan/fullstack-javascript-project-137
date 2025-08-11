# Makefile (raíz del repo)
.PHONY: setup install start build lint test

# Usado por el runner de Hexlet en el paso "setup"
setup: install

# Instala dependencias en la raíz del proyecto
install:
	npm ci

# Dev server (webpack-dev-server). El runner no abre navegador.
start:
	npm run start

# Build de producción (dist/)
build:
	npm run build

# Linter
lint:
	npx eslint .

# Punto de entrada para pruebas (si el runner lo invoca)
test:
	npm test
