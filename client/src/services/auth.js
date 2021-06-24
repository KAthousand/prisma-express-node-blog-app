import api from './apiConfig';

export const loginUser = async (loginData) => {
  const response = await api.post('/users/login', loginData);
  localStorage.setItem("authToken", response.data.accessToken);
  api.defaults.headers.common.authorization = `Bearer ${response.data.accessToken}`
  return verifyUser();
}

export const registerUser = async (registerData) => {
  const response = await api.post('/users/', registerData)
  localStorage.setItem("authToken", response.data.accessToken);
  api.defaults.headers.common.authorization = `Bearer ${response.data.accessToken}`
  return response.data.user
}


export const verifyUser = async () => {
  const accessToken = localStorage.getItem('authToken');
  if (accessToken) {
    api.defaults.headers.common.authorization = `Bearer ${accessToken}`;
    const response = await api.get('/auth/verify');
    return response.data.user;
  }
  return null;
}

export const removeToken = () => {
  api.defaults.headers.common.authorization = null;
}

