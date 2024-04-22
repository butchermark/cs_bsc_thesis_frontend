FROM node:18.2.0-alpine

RUN apk add --no-cache git

WORKDIR /gamefeedr

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]