#!/bin/bash

export CYPRESS_DIR=$(dirname -- "$(readlink -f "${BASH_SOURCE}")")
export CYPRESS_baseUrl=${CYPRESS_baseUrl:-http://localhost:8081/index.php}
export APP_SOURCE=$CYPRESS_DIR/..

function finish {
	docker-compose down
}
trap finish EXIT

cd $CYPRESS_DIR
if [ ! -f $(npm bin)/wait-on ]
then
	npm install --no-save wait-on
fi

# start server if it's not running yet
if $(npm bin)/wait-on -i 500 -t 1000 $CYPRESS_baseUrl
then
	echo Server is up at $CYPRESS_baseUrl
else
	docker-compose up -d
	$(npm bin)/wait-on -i 500 -t 240000 $CYPRESS_baseUrl || ( docker-compose logs ; exit 1 )
	docker-compose exec -T nextcloud bash /var/www/html/apps/text/cypress/server.sh
fi

(cd .. && $(npm bin)/cypress $@)


