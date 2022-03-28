FROM node:lts-alpine

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package.json yarn.* ./

RUN apk add --no-cache git

COPY . /home/node/app/

RUN chown -R node:node /home/node

USER node

RUN yarn

EXPOSE 3333
EXPOSE 8080

ENTRYPOINT ["node","ace","serve","--watch", "--encore-args=--host 0.0.0.0"]
