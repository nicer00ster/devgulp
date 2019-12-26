#!/bin/bash
certbot certonly --webroot -w /usr/share/nginx/html -d ${HOST_URL}
cp /etc/letsencrypt/live/${HOST_URL}/fullchain.pem /opt/cert/public.pem
cp /etc/letsencrypt/live/${HOST_URL}/privkey.pem /opt/cert/private.pem
supervisorctl restart nginx-app
