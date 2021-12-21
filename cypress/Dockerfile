FROM nextcloudci/server:server-17

RUN mkdir /var/www/html/data
RUN chown -R www-data:www-data /var/www/html/data
ENV BRANCH stable22

ENTRYPOINT /usr/local/bin/initAndRun.sh

# FROM nextcloud:18-rc-apache


#ENTRYPOINT []
#CMD ["apache2-foreground"]
