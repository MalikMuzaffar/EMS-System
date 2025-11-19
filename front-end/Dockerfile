# stage 1

FROM node:22-alpine AS build

WORKDIR /New-app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# stage 2


FROM nginx:alpine

#COPY --from=build /New-app/build /usr/share/nginx/html
COPY --from=build /New-app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx" , "-g" , "daemon off;"]
