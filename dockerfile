# FROM node:16-alpine3.11

FROM alpine:latest

WORKDIR /nyaamon

COPY . .

RUN apk add --update nodejs npm

RUN npm install

CMD ["node", "./index.js"]
