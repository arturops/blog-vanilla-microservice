const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
const comments = {};

app.post("/events", (req, res) => {
    console.log("Received Event", req.body, req.body.data.id);

    const { type, data } = req.body;

    if (type == "PostCreated"){
        const postId = data.id;
        posts[postId] = data;
    }
    else if (type == "CommentCreated"){
        postId = data.postId;
        const comment = {id: data.id, content: data.content}
        if (!(postId in comments)){
            comments[postId] = [comment]
        }
        else{
            comments[postId].push(comment)
        }
    }
});

app.get("/:id/post", (req, res) => {
    const postId = req.params.id;
    const renderPosts = { ... posts[postId], comments: comments[postId]}
    console.log("posts query", renderPosts);
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

    console.log("posts query", renderPosts);
    res.send(renderPosts);
});


app.listen(4002, () => {
    console.log("Listening on 4002")
});