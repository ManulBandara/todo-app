FROM nginx:stable-alpine

# Remove default nginx html
RUN rm -rf /usr/share/nginx/html/*

# Copy your frontend files
COPY . /usr/share/nginx/html

EXPOSE 80
