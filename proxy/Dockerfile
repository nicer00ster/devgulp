FROM nginx:latest

VOLUME [ "/opt/cert" ]

COPY scripts /opt/scripts

RUN apt-get update \
    && apt-get install -y \
    openssl \
    supervisor \
    cron \
    && rm -rf /var/lib/apt/lists/*

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/proxy.conf

COPY supervisor /etc/supervisor/conf.d/

COPY dhparam.pem /opt/cert/dhparam.pem

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT [ "docker-entrypoint.sh" ]

CMD ["supervisord",  "-n"]
