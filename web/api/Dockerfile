FROM php:fpm-alpine3.13
ENV TZ "Europe/Amsterdam"
RUN docker-php-ext-install pdo pdo_mysql
COPY . /var/www/html/
EXPOSE 9000