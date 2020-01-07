#!/bin/bash

export CYPRESS_baseUrl=http://localhost:8081/index.php
export APP_SOURCE=$PWD/..

function finish {
	docker-compose down
}
trap finish EXIT

docker-compose up -d

npm install --no-save wait-on
$(npm bin)/wait-on -i 500 -t 240000 $CYPRESS_baseUrl || (cd cypress && docker-compose logs && exit 1)
docker-compose exec -T nextcloud bash /var/www/html/apps/text/cypress/server.sh

(cd .. && $(npm bin)/cypress $@)


