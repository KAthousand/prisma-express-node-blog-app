import React from 'react';
import { deleteComment } from '../../services/comments';
import { getOnePost } from '../../services/posts';
import "./CommentCard.css"

function CommentCard(props) {
  const { id, content, author, userId, likes, createdAt, currentUser, postId, setPost } = props;
  const date = `${createdAt}`
  const replaceDate = new Date(Date.parse(`${date}`));
  const newDate = replaceDate.toLocaleString();

  const destroyComment = async (id) => {
    await deleteComment(id)
    const post = await getOnePost(postId);
      const date = `${post.createdAt}`
      const replaceDate = new Date(Date.parse(`${date}`));
      const newDate = replaceDate.toLocaleString();
      setPost(post)
      setPost((prevState) => ({ ...prevState, createdAt: newDate }))
  }

  return (
    <div className='comment-card'>
      <div className='comment-card-content'>
        <h2>{content}</h2>
        <p>{author}</p>
        <h6>{newDate}</h6>
      </div>
      <div className='comment-card-extra'>
        <h6>{likes} {likes === 1 ? 'like' : 'likes'}</h6>
        {currentUser.id === userId &&
          <button onClick={()=>destroyComment(id)}><h6>Delete Comment</h6></button>}
      </div>
    </div>
  );
}

export default CommentCard;