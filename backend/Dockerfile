FROM php:8.2-apache

# Enable mysqli & pdo_mysql
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copy project files
COPY . /var/www/html/

# Set working directory
WORKDIR /var/www/html/

# Expose port 80
EXPOSE 80
