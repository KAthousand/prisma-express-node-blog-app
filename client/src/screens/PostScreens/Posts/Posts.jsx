import React from 'react';
import PostCard from '../../../components/PostCard/PostCard';
import './Posts.css';

function Posts(props) {
  const { posts, currentUser, resetPosts } = props;

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
          likesContent={post.likes}
          likes={post._count.likes}
          comments={post._count.comments}
          currentUser={currentUser}
          resetPosts={resetPosts}
        />
      ))}
    </div>
  );
}

export default Posts;