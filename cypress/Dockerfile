FROM nextcloud:latest as source

WORKDIR /tmp

RUN set -ex; \
    apt-get update; \
    apt-get install -y --no-install-recommends git;

RUN set -ex; \
    git clone --depth 1 https://github.com/nextcloud/server.git ; \
    git clone --depth 1 https://github.com/nextcloud/viewer server/apps/viewer;

RUN set -ex; \
    cd server; \
    git submodule update --init;

RUN cp -r -v /usr/src/nextcloud/config /tmp/server

FROM nextcloud:latest

RUN set -ex; \
	rm -rf /usr/src/nextcloud;

COPY --from=source --chown=www-data:www-data /tmp/server /usr/src/nextcloud
COPY --chown=www-data:www-data ./server.sh /tmp/server.sh

RUN set -ex; \
	cd /usr/src/nextcloud; \
	mkdir data; \
    mkdir custom_apps; \
    chown -R www-data:www-data config data apps custom_apps;

ENV NEXTCLOUD_ADMIN_PASSWORD=admin
ENV NEXTCLOUD_ADMIN_USER=admin
ENV SQLITE_DATABASE=sqlite_db

RUN set -ex; \
	cd /var/www/html; \
	NEXTCLOUD_UPDATE=1 bash -x /entrypoint.sh pwd; \
	chown -R www-data:www-data config data apps custom_apps; \
	bash -x /tmp/server.sh; \
	rm -rf /var/www/html/apps/text

RUN set -ex; \
	cd /var/www/html; \
	ls -lah
