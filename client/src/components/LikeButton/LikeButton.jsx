import { useState } from 'react';
import { createLike, deleteLike } from '../../services/likes'
import "./LikeButton.css"

function LikeButton(props) {
  const { currentUser, postId, resetPosts, liked } = props;
  const [formData, setFormData] = useState({
    userId: null,
    postId: null,
    commentId: null
  })

  const handleLike = () => {
    setFormData(prevState => ({
      ...prevState,
      userId: Number(currentUser.id),
      postId: Number(postId)
    }))
  }


  const newLike = async (formData) => {
    try {
      await createLike(formData)
      setFormData({
        userId: null,
        postId: null,
        commentId: null
      })
      resetPosts()
    } catch (error) {
      console.log(error)
    }
  }

  const destroyLike = async (id) => {
    try {
      await deleteLike(id);
      resetPosts();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {liked ? (
        <button
          className='like-button liked'
          onClick={() => destroyLike(liked.id)}
        >
          Like
        </button>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            newLike(formData);
          }}>
          <button
            className='like-button'
            onClick={() => handleLike()}
          >
            Like
          </button>
        </form>
      )
      }
    </>
  );
}

export default LikeButton;