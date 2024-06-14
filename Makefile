# SPDX-FileCopyrightText: 2019-2024 Nextcloud GmbH and Nextcloud contributors
# SPDX-License-Identifier: AGPL-3.0-or-later

app_name=$(notdir $(CURDIR))

.NOTPARALLEL:

all: dev-setup lint build-js-production

# Dev env management
dev-setup: clean clean-dev npm-init

npm-init:
	npm ci

npm-update:
	npm update

# Building
build-js:
	npm run dev

build-js-production:
	npm run build

watch-js:
	npm run watch

# Testing
test: test-js test-cypress

test-cypress:
	cd cypress && ./runLocal.sh run

test-cypress-watch:
	cd cypress && ./runLocal.sh open

test-js:
	npm run test

test-js-watch:
	npm run test:watch

test-js-coverage:
	npm run test:coverage

dump-autoloader:
	cd composer && composer dump

# Linting
lint:
	npm run lint

lint-fix:
	npm run lint:fix

# Style linting
stylelint:
	npm run stylelint

stylelint-fix:
	npm run stylelint:fix

# Cleaning
clean:
	rm -rf js/*

clean-dev:
	rm -rf node_modules

clean-git:
	rm -r js/
	git checkout -- js/
