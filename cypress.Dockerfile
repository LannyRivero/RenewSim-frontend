# Usa la imagen oficial de Cypress
FROM cypress/included:14.4.0

# Asegura que el directorio de trabajo exista y sea correcto
RUN mkdir -p /e2e
WORKDIR /e2e

# Copia tus tests e2e
COPY ./cypress ./cypress
COPY ./cypress.config.js /e2e/  # Ajusta la ruta según tu proyecto
COPY ./package*.json ./

# Instala dependencias de tests (opcional si usas plugins o helpers de Node)
RUN npm ci




