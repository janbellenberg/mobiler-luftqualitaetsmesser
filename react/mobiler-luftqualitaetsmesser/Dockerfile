## REACT BUILD ##
FROM node:lts-alpine3.13 as react-builder 
WORKDIR /root/app

RUN npm install react-scripts -g

COPY . .
RUN npm ci && npm run build

## APACHE WEBSERVER ##
FROM httpd:2.4.46-alpine AS apache
COPY --from=react-builder /root/app/build /usr/local/apache2/htdocs/
EXPOSE 80