FROM node:14.16.1-buster

RUN apt-get update

WORKDIR /var/www/api_js_nodejs/

COPY . .

RUN cp src/.env.example .env

# RUN chmod -R 755 src/

RUN npm install

EXPOSE 3000

CMD [ "npm", "dev" ]
