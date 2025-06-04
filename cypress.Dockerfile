FROM cypress/included:14.4.0

# Crea el directorio de trabajo explícitamente
RUN mkdir -p /e2e

# Copia tus tests e2e y config
COPY ./cypress ./cypress
COPY ./cypress.config.js /e2e/
COPY ./package*.json /e2e/

WORKDIR /e2e

# Instala dependencias (opcional)
RUN npm ci





