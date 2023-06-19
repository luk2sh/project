FROM node:18-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]
