#!/bin/bash
# TODO: move this out of the repo to make it usable in other apps

set -e

DATABASENAME=oc_autotest
DATABASEUSER=oc_autotest
[ -z "$DATABASEHOST" ] && DATABASEHOST="localhost"
ADMINLOGIN=admin
BASEDIR=$PWD

DBCONFIGS="sqlite mysql pgsql oracle"
PHPUNIT=$(which phpunit)

if [ $1 ]; then
	FOUND=0
	for DBCONFIG in $DBCONFIGS; do
		if [ $1 = $DBCONFIG ]; then
			FOUND=1
			break
		fi
	done
	if [ $FOUND = 0 ]; then
		echo -e "Unknown database config name \"$1\"\n" >&2
		print_syntax
		exit 2
	fi
fi

# use tmpfs for datadir - should speedup unit test execution
DATADIR=$BASEDIR/data-autotest

echo "Using $1 database $DATABASENAME"

# create autoconfig for sqlite, mysql and postgresql
cat > ./tests/autoconfig-sqlite.php <<DELIM
<?php
\$AUTOCONFIG = array (
  'installed' => false,
  'dbtype' => 'sqlite',
  'dbtableprefix' => 'oc_',
  'adminlogin' => '$ADMINLOGIN',
  'adminpass' => 'admin',
  'directory' => '$DATADIR',
);
DELIM

cat > ./tests/autoconfig-mysql.php <<DELIM
<?php
\$AUTOCONFIG = array (
  'installed' => false,
  'dbtype' => 'mysql',
  'dbtableprefix' => 'oc_',
  'adminlogin' => '$ADMINLOGIN',
  'adminpass' => 'admin',
  'directory' => '$DATADIR',
  'dbuser' => '$DATABASEUSER',
  'dbname' => '$DATABASENAME',
  'dbhost' => '$DATABASEHOST',
  'dbpass' => 'owncloud',
);
DELIM

cat > ./tests/autoconfig-pgsql.php <<DELIM
<?php
\$AUTOCONFIG = array (
  'installed' => false,
  'dbtype' => 'pgsql',
  'dbtableprefix' => 'oc_',
  'adminlogin' => '$ADMINLOGIN',
  'adminpass' => 'admin',
  'directory' => '$DATADIR',
  'dbuser' => '$DATABASEUSER',
  'dbname' => '$DATABASENAME',
  'dbhost' => '$DATABASEHOST',
  'dbpass' => 'owncloud',
);
DELIM

cat > ./tests/autoconfig-oracle.php <<DELIM
<?php
\$AUTOCONFIG = array (
  'installed' => false,
  'dbtype' => 'oci',
  'dbtableprefix' => 'oc_',
  'adminlogin' => '$ADMINLOGIN',
  'adminpass' => 'admin',
  'directory' => '$DATADIR',
  'dbuser' => 'autotest',
  'dbname' => 'XE',
  'dbhost' =>'$DATABASEHOST',
  'dbpass' => 'owncloud',
  'loglevel' => 0,
);
DELIM

function run_install {
	echo "Setup environment for $1 testing ..."
	# back to root folder
	cd $BASEDIR

	# revert changes to tests/data
	git checkout tests/data/*

	# reset data directory
	rm -rf $DATADIR
	mkdir $DATADIR
	touch $DATADIR/nextcloud.log

	cp tests/preseed-config.php config/config.php

	# copy autoconfig
	cp $BASEDIR/tests/autoconfig-$1.php $BASEDIR/config/autoconfig.php

	# trigger installation
	echo "INDEX"
	php -f index.php
	echo "END INDEX"

}

function print_config {

    echo "nextcloud configuration:"
    cat $BASEDIR/config/config.php

    echo "data directory:"
    ls -ll $DATADIR

    echo "nextcloud.log:"
    [[ -f "$DATADIR/nextcloud.log" ]] && cat $DATADIR/nextcloud.log

}

run_install $1
print_config

cd $BASEDIR