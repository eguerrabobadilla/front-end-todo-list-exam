# Etapa 1: Construcción
FROM node:lts-bullseye AS build

# Crear el directorio de trabajo
WORKDIR /app

# Copiar el package.json y el package-lock.json (si lo tienes)
COPY package.json /app

# Instalar las dependencias
RUN npm install

# Instalar Ionic globalmente
RUN npm install -g @ionic/cli

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación Ionic
RUN ionic build

# Etapa 2: Servidor web
FROM nginx:alpine

# Copiar el archivo de configuración de Nginx
ADD ./config/default.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos compilados desde la etapa de compilación
COPY --from=build /app/www /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
