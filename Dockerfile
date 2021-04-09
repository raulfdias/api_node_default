FROM node:14.16.1-buster

RUN apt-get update

RUN npm install -g yarn

RUN apt-get update

WORKDIR /var/www/api_js_nodejs/

COPY . /var/www/api_js_nodejs/

RUN chmod -R 755 /var/www/api_js_nodejs/

EXPOSE 3000
