import React, { useState, useEffect } from "react";
import axios from 'axios';
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
import config from "./config";

const PostList = () => {
    // return an object {} because thats why the posts list returns
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        try{
            const res = await axios.get(`${config.query_domain}/posts`);
            setPosts(res.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    // run at start to fetch posts
    useEffect(() => {
        fetchPosts();
    }, []); // empty array to indicate to only run this function once

    console.log(posts)

    const renderedPosts = Object.values(posts).map(post => {
       return (
            <div 
                className="card" 
                style={{ width: '30%', marginBottom: '20px' }}
                key={post.id}
            >
                <div className="card-body">
                    <h3>{ post.title} </h3>
                    <hr/>
                    <CommentList comments={post.comments}/>
                    <CommentCreate postId={post.id}/>
                </div>
            </div>
       )
    });

    return (
        <div className='d-flex flex-row flex-wrap justify-content-between'>
            {renderedPosts}
        </div>
    );
}

export default PostList;