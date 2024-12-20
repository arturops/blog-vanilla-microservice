const express = require("express");
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');
const config = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// memory storage
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content, status: 'pending' });
    commentsByPostId[req.params.id] = comments;

    //propgate an event
    await axios.post(`${config.event_bus_domain}:4005/events`, {
        type: "CommentCreated",
        data: {
            id: commentId,
            content: content,
            postId: req.params.id,
            status: 'pending'
        },
    });

    res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
    console.log("Received Event", req.body);

    const { type, data } = req.body;

    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => {
            return comment.id === id
        });
        comment.status = status;

        await axios.post(`${config.event_bus_domain}:4005/events`, {
            type: 'CommentUpdated',
            data: {
                id,
                postId,
                content,
                status: comment.status,
            }
        });
    }

    res.send({});
});

app.listen(4001, () => {
    console.log('=> Comments - Listening on 4001');
    console.log(`=> Events bus domain ${config.event_bus_domain}`);
});