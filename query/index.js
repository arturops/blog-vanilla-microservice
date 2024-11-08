const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const config = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
const comments = {};

const handleEvent = (type, data) => {
    if (type == "PostCreated"){
        const postId = data.id;
        posts[postId] = data;
    }
    else if (type == "CommentCreated"){
        const postId = data.postId;
        const comment = {
            id: data.id,
            content: data.content,
            status: data.status
        }
        if (!(postId in comments)){
            comments[postId] = [comment]
        }
        else{
            comments[postId].push(comment)
        }
    }
    else if (type == "CommentUpdated"){
        const { id, content, postId, status } = data;
        const comment = comments[postId].find(comment => {
            return comment.id === id;
        });
        // update status and content
        comment.status = status;
        comment.content = content;
    }
};

app.post("/events", (req, res) => {
    console.log("Received Event", req.body);
    const { type, data } = req.body;
    handleEvent(type, data);
    res.send({});
});

app.get("/posts/:id", (req, res) => {
    const postId = req.params.id;
    const renderPosts = { ... posts[postId], comments: comments[postId]}
    res.send(renderPosts);
});

app.get("/posts", (req, res) => {
    const renderPosts = {}

    for (const key in posts){
        renderPosts[key] = {...posts[key], comments: []}
        if (key in comments){
            renderPosts[key]["comments"] = comments[key]
        }
    }

    res.send(renderPosts);
});

app.listen(4002, async () => {
    console.log("=> Query - Listening on 4002");
    console.log(`=> Event bus domain ${config.event_bus_domain}`);

    // when app start we check events to reprocess in case of missing ones
    // very vanilla implementation as all get reprocessed
    let res = {};
    try{
        res = await axios.get(`${config.event_bus_domain}:4005/events`);
    } catch (error){
        console.log("Could not retrieve events", error.message);
        res["data"] = [];
    }

    for (let event of res.data){
        console.log('Procesing event', event);
        const { type, data } = event;
        handleEvent(type, data);
    }
});