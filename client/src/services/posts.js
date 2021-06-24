import api from "./apiConfig"

export const getAllPosts = async () => { 
  try { 
    const response = await api.get('/posts')
    return response.data
  } catch (error) {
    throw error;
  }
}

export const getOnePost = async (id) => { 
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.log(error)
    throw error
  }
}
 
export const createPost = async (postData) => {
  try {
    const response = await api.post('/posts', postData);
    return response.data;
  } catch (error) {
    throw error
  }
  
}

export const updatePost = async (id, postData) => { 
  try {
    const response = await api.put(`/posts/${id}`, postData );
    return response.data;
  } catch (error) { 
    throw error;
  }
}

export const deletePost = async (id) => { 
  try {
    const response = await api.delete(`/posts/${id}`);
    return response
  } catch (error) {
    throw error;
  }
}

