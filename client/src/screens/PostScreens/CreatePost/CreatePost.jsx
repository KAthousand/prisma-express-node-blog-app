import {useEffect, useState} from 'react';
import "./CreatePost.css"

function CreatePost(props) {
  const { currentUser, newPost, error } = props;
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    userId: null
  })
  const { title, content } = formData;

  useEffect(() => {
    if (currentUser) {
      setFormData(prevState => ({
        ...prevState, userId: currentUser.id
      }))
    }
  },[currentUser])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  return (
    <div className='create-form-container'>
      { currentUser ? (
        <div className='create-form'>
          <h1>Create a post!</h1>
          <form onSubmit={(e) => {
            e.preventDefault();
            newPost(formData);
            if (!error) {
              setFormData({
                title: "",
                content: ""
              })
            }
          }}>
            <label htmlFor='title'> Title:</label>
            <input
              autoFocus
              type='text'
              name='title'
              value={title}
              onChange={handleChange}
            />
            <label htmlFor='content'> Content:</label>
            <textarea
              type='text'
              name='content'
              value={content}
              onChange={handleChange}
            />
            <button>Submit</button>
            {error && (
              <div className='error-container'>
                <div className='error'>
                  {error.map((error, idx)=>(<h6 key={idx}>{error}</h6>))}
                </div>
              </div>
              )}
          </form>
        </div>
      ) : (
        <div>
          <h2>Loading...</h2>    
        </div>  
      )
      }
    
  </div>
  );
}

export default CreatePost;