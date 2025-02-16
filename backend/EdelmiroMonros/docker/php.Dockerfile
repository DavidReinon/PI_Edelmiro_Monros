# Usa la imagen oficial de PHP con FPM y las extensiones necesarias
FROM php:8.2-fpm

# Instala paquetes necesarios
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    unzip \
    git \
    curl \
    libonig-dev \
    libxml2-dev \
    libicu-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql zip gd intl opcache

# Configuración de PHP para rendimiento en producción
RUN echo "memory_limit=512M" > /usr/local/etc/php/conf.d/memory-limit.ini \
    && echo "upload_max_filesize=20M" > /usr/local/etc/php/conf.d/upload-max-filesize.ini \
    && echo "post_max_size=20M" > /usr/local/etc/php/conf.d/post-max-size.ini \
    && echo "max_execution_time=30" > /usr/local/etc/php/conf.d/max-execution-time.ini

# Configura el directorio de trabajo y copia el código
WORKDIR /var/www/html
COPY . .

# Instala solo las dependencias de Symfony
RUN composer install --no-dev --no-interaction --optimize-autoloader

# Ajusta permisos
RUN chown -R www-data:www-data /var/www/html

CMD ["php-fpm"]

