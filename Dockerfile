FROM node:10

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY dist/ .

EXPOSE 3000

CMD [ "npm", "start" ]