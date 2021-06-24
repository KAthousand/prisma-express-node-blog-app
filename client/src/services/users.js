import api from "./apiConfig"

export const getAllUsers = async () => { 
  try { 
    const response = await api.get('/users')
    return response.data
  } catch (error) {
    throw error;
  }
}

export const getOneUser = async (id) => { 
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const createUser = async (userData) => { 
  try {
    const response = await api.post('/users', userData );
    return response.data;
  } catch (error) { 
    throw error;
  }
}

export const updateUser = async (id, userData) => { 
  try {
    const response = await api.put(`/users/${id}`, userData );
    return response.data;
  } catch (error) { 
    throw error;
  }
}

export const deleteUser = async (id) => { 
  try {
    const response = await api.delete(`/users/${id}`);
    return response
  } catch (error) {
    throw error;
  }
}

