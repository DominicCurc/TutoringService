# type these two commands to build then run it:
# docker build -t mynodeapp .
# docker run -p 3000:3000 mynodeapp

FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]
