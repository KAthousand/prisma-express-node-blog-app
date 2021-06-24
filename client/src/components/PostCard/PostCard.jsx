import React from 'react';
import { Link } from 'react-router-dom';
import './PostCard.css';

function PostCard(props) {
  const { title, content, author, createdAt, likes, id, comments} = props;
  const date = `${createdAt}`
  const replaceDate = new Date(Date.parse(`${date}`));
  const newDate = replaceDate.toLocaleString();

  return (    
    <div className='post-card'>
      <Link to={`/${id}`}>
        <div className='post-card-content'>
          <div className='post-card-header'>
            <h2>{title}</h2>
            <p>{author}</p>
            <h6>{newDate}</h6>
          </div>
          <div className='post-card-body'>
            <p>{content}</p>
          </div>
          <div className='post-card-extra'>
            <h6>{likes} {likes === 1 ? 'like' : 'likes'}</h6>
            <h6>{comments} {comments === 1 ? 'comment' : 'comments'}</h6>
          </div>
        </div>
      </Link>
    </div>

  );
}

export default PostCard;