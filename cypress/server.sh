#!/bin/bash
su -s /bin/bash www-data -c "
php /var/www/html/occ config:system:set debug --value='true' --type=boolean
export OC_PASS=1234561
php /var/www/html/occ user:add --password-from-env user1
php /var/www/html/occ user:add --password-from-env user2
php /var/www/html/occ app:enable viewer
php /var/www/html/occ app:enable text
php /var/www/html/occ app:list
"
