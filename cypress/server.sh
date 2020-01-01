#!/bin/bash
git clone https://github.com/nextcloud/viewer /var/www/html/apps/viewer
su www-data -c "
php /var/www/html/occ app:enable viewer
php /var/www/html/occ app:enable text
php /var/www/html/occ app:list
"
