# cypress.Dockerfile
FROM cypress/included:13.1.0

WORKDIR /e2e
COPY ./cypress ./cypress
COPY ./cypress.config.js ./
COPY ./package.json ./
COPY ./package-lock.json ./

# Ajusta el baseUrl de Cypress para que apunte al frontend
ENV CYPRESS_baseUrl=http://renewsim-frontend:5174

CMD ["cypress", "run"]

