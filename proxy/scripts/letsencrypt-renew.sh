#!/bin/bash
certbot renew
cp /etc/letsencrypt/live/${HOST_URL}/fullchain.pem /opt/cert/public.pem
cp /etc/letsencrypt/live/${HOST_URL}/privkey.pem /opt/cert/private.pem
supervisorctl restart nginx-app
