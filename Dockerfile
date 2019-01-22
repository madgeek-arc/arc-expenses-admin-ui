#FROM nginx:alpine

#COPY nginx.conf /etc/nginx/nginx.conf
#COPY dist/arc-expenses-admin-ui     /usr/share/nginx/html

#EXPOSE 80

# The builder from node image
FROM node:alpine as builder



# Move our files into directory name "app"
WORKDIR /app
COPY package.json  /app/
RUN cd /app && npm install
COPY .  /app

# Build with $env variable from outside
RUN cd /app && npm run docker

# Build a small nginx image with static website
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

