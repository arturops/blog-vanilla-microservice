import React from "react";

const CommentList = ({ comments }) => {

    const renderedComments = comments.map(comment => {
        let content;
        switch(comment.status){
            case 'approved':
                content = comment.content;
                break;
            case 'pending':
                content = 'This comment is awaiting moderation';
                break;
            case 'rejected':
                content = 'This comment was rejected';
                break;
            default:
                content = 'This comment status is missing';
                break;
        }

        return (
            <li key={comment.id}>{content}</li>
        );
    });

    return (
        <ul>
            {renderedComments}
        </ul>
    );
};

export default CommentList;