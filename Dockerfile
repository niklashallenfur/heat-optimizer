FROM node:16-alpine as build
RUN apk add npm

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

CMD ["node","dist/main.js"]
EXPOSE 3000
