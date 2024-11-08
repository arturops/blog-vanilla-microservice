// environment config
module.exports = {
    posts_domain: process.env.POSTS_DOMAIN || "http://localhost:4000",
    comments_domain: process.env.COMMENTS_DOMAIN || "http://localhost:4001",
    query_domain: process.env.QUERY_DOMAIN || "http://localhost:4002",
}