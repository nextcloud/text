FROM nextcloud:latest

RUN set -ex; \
    apt-get update; \
    apt-get install -y --no-install-recommends git; \
    git clone https://github.com/nextcloud/server.git ; \
    git clone https://github.com/nextcloud/viewer server/apps/viewer; \
    cd server; \
    git submodule update --init; \
    mkdir data; \
    chown -R www-data:www-data config data apps custom_apps; \
    cd ..; \
    cp -R /usr/src/nextcloud/config server/ ; \
    rm -rf /usr/src/nextcloud; \
    mv server /usr/src/nextcloud; \
    apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false git; \
    rm -rf /var/lib/apt/lists/*
