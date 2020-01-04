FROM node:buster

WORKDIR /usr/src/app

COPY src ./

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT [ "docker-entrypoint.sh" ]

CMD ["npm", "run", "prod_start"]