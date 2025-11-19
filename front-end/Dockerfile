# Stage 1: Build React/Frontend
FROM node:22-alpine AS build

WORKDIR /New-app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=build /New-app/dist /usr/share/nginx/html   # Use dist folder (Vite/React)

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
