FROM node:buster

WORKDIR /usr/src/app

COPY src/package*.json ./
RUN npm ci --only=production

ARG API_URL
ENV API_URL ${API_URL}
COPY src ./
RUN npm run build

CMD ["npm", "run", "prod_start"]