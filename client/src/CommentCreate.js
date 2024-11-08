import React, { useState } from 'react';
import axios from 'axios';
import config from './config';

const CommentCreate = ({ postId }) => {

    const [comment,  setComment] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post(
            `${config.comments_domain}/posts/${postId}/comments`,
             {"content": comment}
        );
        setComment('');
    };
    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <input
                        value={comment}
                        placeholder="comment ..."
                        required minLength="1"
                        onChange={e => {setComment(e.target.value)}}
                        className="form-control my-2" 
                    >
                    </input>
                    <button className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default CommentCreate;
