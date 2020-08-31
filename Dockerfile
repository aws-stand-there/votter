FROM node:lts-alpine as worker

RUN mkdir /votter

WORKDIR /votter

ADD ["craco.config.js", "yarn.lock", "package.json", "./"]
ADD ./src /votter/src
ADD ./public /votter/public

RUN yarn
RUN yarn build

FROM nginx:stable-alpine

COPY _/default.conf /etc/nginx/conf.d/

COPY --from=worker /votter/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
