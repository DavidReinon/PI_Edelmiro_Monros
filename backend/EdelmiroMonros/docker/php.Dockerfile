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

# Configura el directorio de trabajo antes de instalar Node.js
WORKDIR /var/www/html

# Copia solo los archivos de Node.js antes de ejecutar npm install
COPY package.json package-lock.json* ./

# Instala Node.js y dependencias
RUN apt-get update && apt-get install -y nodejs npm \
    && npm install --legacy-peer-deps \
    && npm run build

# Luego copia el resto del código
COPY . .

# Instala Composer y dependencias sin ejecutar auto-scripts
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && composer install --no-dev --no-interaction --optimize-autoloader --no-scripts

# Ejecuta cache:clear manualmente en entorno prod
RUN php bin/console cache:clear --env=prod || true

# Ajusta permisos
RUN chown -R www-data:www-data /var/www/html

CMD ["php-fpm"]
