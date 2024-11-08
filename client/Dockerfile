FROM node:alpine

ENV POSTS_DOMAIN="http://localhost:4000" \
    COMMENTS_DOMAIN="http://localhost:4001" \
    QUERY_DOMAIN="http://localhost:4002"
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]