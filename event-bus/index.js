const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const config = require('./config');
//const cors = require('cors');

const app = express();
app.use(bodyParser.json());
//app.use(cors());

const events = []

const sendEvent = (url, event) => {
    console.log("Sending", event);
    axios.post(url, event).catch((err) => {
        console.log(err.message);
    });
}

const sendEvents = (payload) => {
    //post
    sendEvent(`${config.posts_domain}:4000/events`, payload);
    //comment
    sendEvent(`${config.comments_domain}:4001/events`, payload);
    //query
    sendEvent(`${config.query_domain}:4002/events`, payload);
    //moderation
    sendEvent(`${config.moderation_domain}:4003/events`, payload);
};

app.post('/events', (req, res) => {
    const event = req.body
    sendEvents(event);
    events.push(event);
    res.send({status: "OK"});
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log("=> Event bus - Listening in 4005");
    console.log(`=> Posts domain ${config.posts_domain}`);
    console.log(`=> Comments domain ${config.comments_domain}`);
    console.log(`=> Query domain ${config.query_domain}`);
    console.log(`=> Moderation domain ${config.moderation_domain}`);
});