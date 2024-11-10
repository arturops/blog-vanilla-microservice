// environment config
// react app en vars need to be prefixed by REACT_APP_
module.exports = {
    posts_domain: process.env.REACT_APP_POSTS_DOMAIN || "http://localhost:4000",
    comments_domain: process.env.REACT_APP_COMMENTS_DOMAIN || "http://localhost:4001",
    query_domain: process.env.REACT_APP_QUERY_DOMAIN || "http://localhost:4002",
}

console.log(`=> Posts domain - ${process.env.REACT_APP_POSTS_DOMAIN }`);
console.log(`=> Query domain - ${process.env.REACT_APP_QUERY_DOMAIN}`);
console.log(`=> Comments domain - ${process.env.REACT_APP_COMMENTS_DOMAIN}`);