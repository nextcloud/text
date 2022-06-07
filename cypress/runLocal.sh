#!/bin/bash

CYPRESS_DIR=$(dirname -- "$(readlink -f "${BASH_SOURCE}")")
CYPRESS_baseUrl=${CYPRESS_baseUrl:-http://localhost:8081/index.php}
APP_SOURCE=$CYPRESS_DIR/..

export CYPRESS_DIR
export CYPRESS_baseUrl
export APP_SOURCE

function finish {
	docker-compose down
}
trap finish EXIT

cd "$CYPRESS_DIR" || exit
if [ ! -f "$(npm bin)/wait-on" ]
then
	npm install --no-save wait-on
fi

# start server if it's not running yet
if "$(npm bin)/wait-on" -i 500 -t 1000 "$CYPRESS_baseUrl" 2> /dev/null
then
	echo Server is up at "$CYPRESS_baseUrl"
else
	echo No server reached at "$CYPRESS_baseUrl" - starting containers.
	docker-compose up -d
	if "$(npm bin)/wait-on" -i 500 -t 240000 "$CYPRESS_baseUrl" 2> /dev/null
	then
		docker-compose exec -T nextcloud_cypress bash /var/www/html/custom_apps/text/cypress/server.sh
	else
		echo Waiting for "$CYPRESS_baseUrl" timed out.
		echo Container logs:
		docker-compose logs
		exit 1
	fi
fi

(cd .. && "$(npm bin)/cypress" "$@")
