import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LikeButton from '../LikeButton/LikeButton';
import './PostCard.css';

function PostCard(props) {
  const { title, content, author, createdAt, likes, id, comments, currentUser, resetPosts, likesContent } = props;
  const [liked, setLiked] = useState(null)
  const date = `${createdAt}`
  const replaceDate = new Date(Date.parse(`${date}`));
  const newDate = replaceDate.toLocaleString();

  useEffect(() => {
    if (currentUser) {
      const likes = likesContent.find(like => currentUser.id === like.userId)
      setLiked(likes);
    }
  }, [currentUser, likesContent])

  return (
    <div className='post-card'>
      <div className='post-card-content'>
        <Link to={`/${id}`}>
          <div className='post-card-header'>
            <h2>{title}</h2>
            <p>{author}</p>
            <h6>{newDate}</h6>
          </div>
          <div className='post-card-body'>
            <p>{content}</p>
          </div>
        </Link>
        <div className='post-card-extra'>
          <div className='likes-container'>
            {(currentUser) ? (
              <LikeButton
                currentUser={currentUser}
                postId={id}
                resetPosts={resetPosts}
                liked={liked}
              />
            ) : (
              <Link to='/login'>Like</Link>
            )}

            <h6>{likes} {likes === 1 ? 'like' : 'likes'}</h6>
          </div>
          <h6>{comments} {comments === 1 ? 'comment' : 'comments'}</h6>
        </div>
      </div>
    </div>

  );
}

export default PostCard;