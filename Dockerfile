FROM node:15.8.0-buster

RUN apt-get update

RUN mkdir -p /applications/api_node_default
WORKDIR /applications/api_node_default

COPY package.json yarn.lock ./
RUN yarn

COPY . ./

RUN cp /applications/api_node_default/src/.env.example /applications/api_node_default/src/.env

RUN chmod -R 755 /applications/

EXPOSE 4000

WORKDIR /applications/api_node_default/src/public
CMD node ./index.js
