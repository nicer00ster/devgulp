FROM nginx:latest

VOLUME [ "/opt/cert" ]

RUN apt-get update \
    && apt-get install -y \
    openssl \
    supervisor \
    && rm -rf /var/lib/apt/lists/*

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/proxy.conf

COPY supervisor-nginx.conf /etc/supervisor/conf.d/nginx.conf

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT [ "docker-entrypoint.sh" ]

CMD ["supervisord",  "-n"]