FROM node:14-buster as build
WORKDIR /opt/app
COPY ./ ./
RUN npm install --production && \
    npm run build

FROM nginx:stable-alpine
COPY --from=build /opt/app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
