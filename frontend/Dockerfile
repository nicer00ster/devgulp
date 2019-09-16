FROM node:buster

WORKDIR /usr/src/app

COPY src/package*.json ./
RUN npm ci --only=production

COPY src ./
RUN npm run build

CMD ["npm", "run", "prod_start"]