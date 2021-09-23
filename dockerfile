FROM node:latest

WORKDIR /usr/nyaamon

COPY . .

RUN npm install

CMD ["node", "./index.js"]
