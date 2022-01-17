#!/bin/bash
git clone https://github.com/nextcloud/viewer --branch $BRANCH /var/www/html/apps/viewer
su www-data -c "
php occ config:system:set force_language --value en
php /var/www/html/occ app:enable viewer
php /var/www/html/occ app:enable text
php /var/www/html/occ app:list
"
