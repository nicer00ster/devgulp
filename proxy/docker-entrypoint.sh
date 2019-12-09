#!/bin/bash
set -euo pipefail

if [[ ! -e '/opt/cert/public.pem' ]] || [[ ! -e '/opt/cert/private.pem' ]]; then
    openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 \
    -subj "/C=US/ST=/L=/O=/CN=www.example.com" \
    -keyout /opt/cert/private.pem -out /opt/cert/public.pem
fi

if [[ $ENABLE_LETSENCRYPT == 1 ]]; then
    # enable cron for letsencrypt
    crontab /opt/scripts/letsencrypt.cron
fi

exec "$@"
