FROM node as web_assets

LABEL maintainer="lixiumiao@gmail.com"
ENV LANG C.UTF-8
ENV APP_ROOT /app

WORKDIR $APP_ROOT
COPY package.json $APP_ROOT
COPY yarn.lock $APP_ROOT
RUN yarn install
COPY . $APP_ROOT
RUN yarn build

FROM nginx:1.18.0
COPY --from=web_assets /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
