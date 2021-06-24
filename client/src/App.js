import Register from './screens/Register/Register';
import Login from './screens/Login/Login';
import PostsContainer from './containers/PostsContainer/PostsContainer';
import Layout from './screens/shared/Layout/Layout';

import { Switch, Route, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import {loginUser, registerUser, removeToken, verifyUser} from './services/auth'

import './App.css';


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const handleVerify = async () => {
      const currentUser = await verifyUser();
      setCurrentUser(currentUser);
    }
    handleVerify()
  }, [])
  
  const handleLogin = async (formData) => {
    try {
      const currentUser = await loginUser(formData);
      setCurrentUser(currentUser);
      setError(null)
      history.push('/')
    } catch (error) {
      const errorMsgArr = [Object.values(error.response.data)];
      setError(errorMsgArr)
    }
  }

  const handleRegister = async (formData) => {
    const currentUser = await registerUser(formData);
    setCurrentUser(currentUser);
    history.push('/')
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    removeToken();
    setCurrentUser(null);
    history.push('/')
  }

  return (

<Layout
      currentUser={currentUser}
      handleLogout={handleLogout}
    >
      <Switch>
        <Route path='/login'>
          <Login handleLogin={handleLogin} error={error}/>
        </Route>
        <Route path='/register'>
          <Register handleRegister={handleRegister}/>
        </Route>
        <Route path='/'>
          <PostsContainer currentUser={currentUser}/>
        </Route>
      </Switch>
    </Layout>
    
  );
}

export default App;
