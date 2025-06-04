FROM cypress/included:14.4.0

WORKDIR /e2e

COPY ./cypress ./cypress
COPY ./cypress.config.js .  # Ajusta si usas config separado
COPY ./package.json .       # Para que Cypress conozca las dependencias
COPY ./package-lock.json .  # Opcional
RUN npm ci

# Usa la red interna de docker compose
ENV CYPRESS_baseUrl=http://renewsim-backend:8080

CMD ["npx", "cypress", "run"]



