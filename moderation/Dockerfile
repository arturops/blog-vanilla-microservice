FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN nom install
COPY ./ ./

CMD ["npm", "start"]