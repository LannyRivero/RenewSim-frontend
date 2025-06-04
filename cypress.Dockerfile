FROM cypress/included:14.4.0

# Establecer directorio de trabajo
WORKDIR /e2e

# Copiar package.json y package-lock.json para aprovechar cache de dependencias
COPY ./package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar tests e2e y configuración
COPY ./cypress ./cypress
COPY ./cypress.config.js ./






