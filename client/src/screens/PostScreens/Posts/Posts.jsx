import React from 'react';
import PostCard from '../../../components/PostCard/PostCard';
import './Posts.css';

function Posts(props) {
  const { posts, currentUser } = props;

  return (
    <div className='post-container'>
        {posts.map(post => (
            <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            author={post.user.username}
            createdAt={post.createdAt}
            userID={post.user.id}
            likes={post._count.likes}
            comments={post._count.comments}
            currentUser={currentUser}
            />
        ))}
    </div>
  );
}

export default Posts;