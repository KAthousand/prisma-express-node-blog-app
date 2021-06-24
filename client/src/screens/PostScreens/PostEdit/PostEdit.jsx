import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOnePost } from '../../../services/posts'
import './PostEdit.css'

function PostEdit(props) {
  const [post, setPost] = useState(null);
  const { editPost, currentUser, error } = props;
  const { id } = useParams()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    userId: ""
  })

  const { title, content } = formData;

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getOnePost(id);
      setPost(post)
      if (currentUser) {
        setFormData(prevState => ({
          ...prevState, userId: currentUser.id
        }))
      }
    }
    fetchPost();
  }, [id, currentUser])

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <div className='post-detail-container'>
      { post ? (
        <form className='post-detail-content'
          onSubmit={(e) => {
            e.preventDefault();
            editPost(id, formData);
            if (!error) {
              setFormData({
                title: "",
                content: ""
              })
            }
        }}>
          <div className='post-detail-header'>
            <input
              autoFocus
              type='text'
              name='title'
              value={title}
              placeholder={post.title}
              onChange={handleChange}
            />
            <p>{post.user.username}</p>
          </div>
          <div className='post-detail-body'>
            <textarea
              type='text'
              name='content'
              value={content}
              placeholder={post.content}
              onChange={handleChange}
            />
          </div>
          {error && (
              <div className='error-container'>
                <div className='error'>
                  {error.map((error, idx)=>(<h6 key={idx}>{error}</h6>))}
                </div>
              </div>
              )}
          <button className='post-edit-button'>Submit</button>
          <div className='post-detail-extra'>
            <h6> {post._count.likes} {post._count.likes === 1 ? ' Like' : ' Likes'}</h6>
            <h6>{post._count.comments}{post._count.comments === 1 ? ' Comment' : ' Comments'}</h6>
          </div>
        </form>) : (
          <h1>Loading...</h1>
      )}
    </div>
  );
}

export default PostEdit;