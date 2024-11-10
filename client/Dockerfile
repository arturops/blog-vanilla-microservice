FROM node:alpine

# react app en vars need to be prefixed by REACT_APP_
ENV REACT_APP_POSTS_DOMAIN="http://localhost:4000" \
    REACT_APP_COMMENTS_DOMAIN="http://localhost:4001" \
    REACT_APP_QUERY_DOMAIN="http://localhost:4002"
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]