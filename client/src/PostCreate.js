import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
    const [title, setTitle] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:4000/posts', {title});

        // after  creatign the title post, reset title
        setTitle('');
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input 
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                        className="form-control my-2" 
                    />
                </div>
                <button className="btn btn-primary my-4">Submit</button>
            </form>
        </div>
    );
}

export default PostCreate;