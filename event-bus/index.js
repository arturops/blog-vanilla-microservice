const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
//const cors = require('cors');

const app = express();
app.use(bodyParser.json());
//app.use(cors());

const sendEvents = (payload) => {
    console.log("Sending", payload);
    axios.post('http://localhost:4000/events', payload);
    axios.post('http://localhost:4001/events', payload);
    axios.post('http://localhost:4002/events', payload);
};

app.post('/events', (req, res) => {

    const event = req.body
    sendEvents(event);
    res.send({status: "OK"});
});

app.listen(4005, () => {
    console.log("Listening in 4005");
});