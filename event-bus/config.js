// environment config
module.exports = {
    posts_domain: process.env.POSTS_DOMAIN || "http://localhost",
    comments_domain: process.env.COMMENTS_DOMAIN || "http://localhost",
    query_domain: process.env.QUERY_DOMAIN || "http://localhost",
    moderation_domain: process.env.MODERATION_DOMAIN || "http://localhost",
}