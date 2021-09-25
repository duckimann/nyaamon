FROM node:16-bullseye-slim

WORKDIR /usr/nyaamon

COPY . .

RUN npm install

CMD ["node", "./index.js"]
