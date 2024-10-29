const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
//const cors = require('cors');

const app = express();
app.use(bodyParser.json());
//app.use(cors());

const sendEvent = (url, event) => {
    console.log("Sending", event);
    axios.post(url, event).catch((err) => {
        console.log(err.message);
    });
}

const sendEvents = (payload) => {
    //post
    sendEvent('http://localhost:4000/events', payload);
    //comment
    sendEvent('http://localhost:4001/events', payload);
    //query
    sendEvent('http://localhost:4002/events', payload);
    //moderation
    sendEvent('http://localhost:4003/events', payload);
};

app.post('/events', (req, res) => {

    const event = req.body
    sendEvents(event);
    res.send({status: "OK"});
});

app.listen(4005, () => {
    console.log("Listening in 4005");
});