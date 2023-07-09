#  Dockerfile for Node Express Backend

FROM node:18.16-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

COPY . .

# Exports
EXPOSE 5000

CMD ["npm","start"]