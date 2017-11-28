FROM nginx:1.13.5-alpine

WORKDIR /app

# copy nginx config
COPY script/nginx/nginx.conf /etc/nginx/nginx.conf

# copy built assets
COPY /dist/ /app/

