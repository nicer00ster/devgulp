#!/bin/bash
set -euo pipefail

if [[ ! -e '/opt/cert/public.pem' ]] || [[ ! -e '/opt/cert/private.pem' ]]; then
    openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 \
    -subj "/C=US/ST=/L=/O=/CN=www.example.com" \
    -keyout /opt/cert/private.pem -out /opt/cert/public.pem
fi

if [[ ! -e '/opt/cert/dhparam.pem' ]]; then
    echo 'Generating dhparam file, this may take a few minutes...'
    openssl dhparam -out /opt/cert/dhparam.pem 4096
fi

if [[ $DEPLOY_ENV == "prod" ]]; then
    # enable cron for letsencrypt
    crontab /opt/scripts/letsencrypt.cron
fi

exec "$@"
