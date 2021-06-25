import api from "./apiConfig"

// export const getAllLikes = async () => { 
//   try { 
//     const response = await api.get('/likes')
//     return response.data
//   } catch (error) {
//     throw error;
//   }
// }

// export const getOneLike = async (id) => { 
//   try {
//     const response = await api.get(`/likes/${id}`);
//     return response.data;
//   } catch (error) {
//     console.log(error)
//     throw error
//   }
// }

export const createLike = async (formData) => {
  try {
    const response = await api.post('/likes', formData);
    return response.data;
  } catch (error) {
    throw error
  }
}

// export const updateLike = async (id, likeData) => { 
//   try {
//     const response = await api.put(`/Likes/${id}`, likeData );
//     return response.data;
//   } catch (error) { 
//     throw error;
//   }
// }

export const deleteLike = async (id) => {
  try {
    const response = await api.delete(`/likes/${id}`);
    return response
  } catch (error) {
    throw error;
  }
}

