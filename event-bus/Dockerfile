FROM node:alpine

ENV POSTS_DOMAIN="http://localhost" \
    COMMENTS_DOMAIN="http://localhost" \
    QUERY_DOMAIN="http://localhost" \
    MODERATION_DOMAIN="http://localhost"
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]