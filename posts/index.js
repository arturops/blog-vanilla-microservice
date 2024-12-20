const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');
const config = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(cors());


// memory storage
const posts = {};

// routes
app.get('/posts', (req, res)=>{
    // this route is for internal debugging use only
    res.send(posts);
});

app.post('/posts/create', async (req, res)=>{
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, title
    };

    //propgate an event
    await axios.post(`${config.event_bus_domain}:4005/events`, {
        type: "PostCreated",
        data: posts[id],
    });

    // return
    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log("Received Event", req.body);
    res.send({});
});

app.listen(4000, ()=>{
    console.log('=> Posts - Listening on 4000');
    console.log(`=> Events posting to ${config.event_bus_domain}`);
});
