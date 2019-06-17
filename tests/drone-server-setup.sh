#!/bin/bash
#
# ownCloud
#
# @author Thomas Müller
# @copyright 2014 Thomas Müller thomas.mueller@tmit.eu
#

# TODO: move this out of the repo to make it usable in other apps

set -e

WORKDIR=$PWD
APP_NAME=$1
CORE_BRANCH=$2
DB=$3
echo "Work directory: $WORKDIR"
echo "Database: $DB"

# Cloning server
cd ..
git clone --depth 1 -b $CORE_BRANCH https://github.com/nextcloud/server
cd server
git submodule update --init

# Move app into apps folder
cd apps
cp -R $WORKDIR/ $APP_NAME
cd $WORKDIR

[[ -z "$DATABASEHOST" ]] && DATABASEHOST="$DB"

if [[ "$DB" == "mysql" ]] ; then
    echo "Waiting for MySQL initialisation ..."
    if ! ../server/apps/files_external/tests/env/wait-for-connection $DATABASEHOST 3306 600; then
      echo "[ERROR] Waited 600 seconds, no response" >&2
      exit 1
    fi
fi

if [[ "$DB" == "postgres" ]] ; then
    echo "Waiting for Postgres to be available ..."
    if ! ../server/apps/files_external/tests/env/wait-for-connection $DATABASEHOST 5432 60; then
      echo "[ERROR] Waited 60 seconds for $DATABASEHOST, no response" >&2
      exit 1
    fi
    echo "Give it 10 additional seconds ..."
    sleep 10
    # Temporary fix since core_install uses pgsql
    DB="pgsql"
fi

# TODO: oracle
export DATABASEHOST="$DATABASEHOST"

echo "Installing server"
cd ../server
bash $WORKDIR/tests/drone-server-install.sh $DB

echo "Installing app: $APP_NAME"
php occ app:enable $APP_NAME

cd apps/$APP_NAME
pwd
ls /drone/src
