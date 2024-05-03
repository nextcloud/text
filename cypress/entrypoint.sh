#!/bin/sh
# SPDX-FileCopyrightText: 2012-2024 Nextcloud GmbH and Nextcloud contributors
# SPDX-License-Identifier: AGPL-3.0-or-later
# Ensure correct permissions, as the bind-mount might currupt them (and prevent the installation)
[ -e /var/www/html/custom_apps ] && chown -R www-data:www-data /var/www/html/custom_apps > /dev/null 2>&1

NEXTCLOUD_UPDATE=1
export NEXTCLOUD_UPDATE
OUTPUT=$(/original_entrypoint.sh true)

echo "$OUTPUT"

# Check if new installed
G=$(echo "$OUTPUT" | grep "New nextcloud instance")
if [ $? -eq 0 ]; then
    echo "Nextcloud installed, fill demo data"
    su -s /bin/bash www-data -c "
        php /var/www/html/occ config:system:set debug --value='true' --type=boolean
        export OC_PASS=1234561
        php /var/www/html/occ user:add --password-from-env user1
        php /var/www/html/occ user:add --password-from-env user2
        php /var/www/html/occ app:enable viewer
        php /var/www/html/occ app:enable text
        php /var/www/html/occ app:enable assistant
        php /var/www/html/occ app:enable testing
        php /var/www/html/occ app:list
    "
fi

exec $@
