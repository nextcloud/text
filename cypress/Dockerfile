FROM nextcloudci/server:server-16

RUN mkdir /var/www/html/data
RUN chown -R www-data:www-data /var/www/html/data

ENTRYPOINT /usr/local/bin/initAndRun.sh

# FROM nextcloud:18-rc-apache


#ENTRYPOINT []
#CMD ["apache2-foreground"]
