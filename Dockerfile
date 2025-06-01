# Dockerfile for RenewSim Frontend (Vite + React)
FROM node:18-alpine AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm ci

# Copia todo el código
COPY . .

# Compila la aplicación
RUN npm run build

# Usa una imagen ligera de Nginx para servir la app
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 5174 (opcional, si necesitas exponerlo desde aquí)
EXPOSE 5174

CMD ["nginx", "-g", "daemon off;"]
