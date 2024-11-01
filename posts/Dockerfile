FROM node:alpine

ENV EVENT_BUS_DOMAIN="http://localhost"
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]   
