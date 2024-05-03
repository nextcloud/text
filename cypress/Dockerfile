# SPDX-FileCopyrightText: 2022-2024 Nextcloud GmbH and Nextcloud contributors
# SPDX-License-Identifier: AGPL-3.0-or-later

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

RUN set -ex; \
	cp -r -v /usr/src/nextcloud/config /tmp/server; \
	rm -rf /usr/src/nextcloud/apps/text;

FROM nextcloud:latest

RUN set -ex; \
	rm -rf /usr/src/nextcloud;

COPY --from=source --chown=www-data:www-data /tmp/server /usr/src/nextcloud

RUN set -ex; \
	cd /usr/src/nextcloud; \
	mkdir data; \
    mkdir custom_apps; \
    chown -R www-data:www-data config data apps custom_apps;

ENV NEXTCLOUD_ADMIN_PASSWORD=admin
ENV NEXTCLOUD_ADMIN_USER=admin
ENV SQLITE_DATABASE=sqlite_db

RUN mv /entrypoint.sh /original_entrypoint.sh

COPY --chown=www-data:www-data --chmod=0755 ./entrypoint.sh /entrypoint.sh
