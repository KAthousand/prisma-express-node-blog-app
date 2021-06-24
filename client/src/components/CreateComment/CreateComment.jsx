import React, { useState, useEffect } from 'react';
import { createComment } from '../../services/comments';
import { getOnePost } from '../../services/posts'
import './CreateComment.css'

function CreateComment(props) {
  const { currentUser, postId, setPost, error, setError } = props;
  const [formData, setFormData] = useState({
    content: '',
    userId: null,
    postId: null
  });
  const { content } = formData;

  useEffect(() => {
    if (currentUser) {
      setFormData(prevState => ({
        ...prevState, userId: currentUser.id, postId: Number(postId)
      }))
    }
  }, [currentUser, postId]);

  const newComment = async (formData) => {
    try {
      await createComment(formData);
      const post = await getOnePost(postId);
      const date = `${post.createdAt}`
      const replaceDate = new Date(Date.parse(`${date}`));
      const newDate = replaceDate.toLocaleString();
      setPost(post)
      setPost((prevState) => ({ ...prevState, createdAt: newDate }))
      setError(null);
    } catch (error) {
      const errorMsgArr = Object.values(error.response.data);
      setError(errorMsgArr)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }


  return (
    <div className='create-comment-container'>
      <form className='create-comment'
        onSubmit={(e) => {
          e.preventDefault();
          newComment(formData);
          setFormData({
            content: "",
            userId: currentUser.id,
            postId: Number(postId)
          })
        }}>
        <input
          type='text'
          name='content'
          value={content}
          placeholder='Add your comment:'
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
      {error &&
        <div className='error-container'>
          <div className='error'>
            <h6>{error}</h6>
          </div>
        </div>
      }
    </div>
  );
}

export default CreateComment;