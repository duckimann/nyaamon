FROM node:16-alpine3.11

WORKDIR /usr/nyaamon

COPY . .

RUN npm install

CMD ["node", "./index.js"]
