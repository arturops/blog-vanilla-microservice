const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const config = require('./config');

const app = express();
app.use(bodyParser.json());


app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    // filter out comments with word 'orange'
    const filter = 'orange'
    if (type === 'CommentCreated') {
        const status = data.content.includes(filter) ? 'rejected' : 'approved';

        await axios.post(`${config.event_bus_domain}:4005/events`, {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status: status,
                content: data.content,
            }
        });
    }
    res.send({});
});

app.listen(4003, () =>{
    console.log('=> Moderation - Listening on 4003');
    console.log(`=> Events bus domain ${config.event_bus_domain}`);
});