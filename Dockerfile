#FROM nginx:alpine

#COPY nginx.conf /etc/nginx/nginx.conf
#COPY dist/arc-expenses-admin-ui     /usr/share/nginx/html

#EXPOSE 80

## The builder from node image
#FROM node:alpine as builder
#
#
#
## Move our files into directory name "app"
#WORKDIR /app
#COPY .  /app
##COPY package.json  /app/
#RUN rm -rf node_modules
##RUN cd /app && npm ci
#RUN cd /app && npm ci
#
## Build with $env variable from outside
#RUN cd /app && npm run docker

# Build a small nginx image with static website
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/ /usr/share/nginx/html

EXPOSE 80

