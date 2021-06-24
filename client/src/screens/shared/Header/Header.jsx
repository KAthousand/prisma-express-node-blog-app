import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

function Header(props) {
  const { currentUser, handleLogout } = props;

  return (
    <div className='header-container'>
      
      {currentUser ? (
        <div className='header-content'>
          <Link to='/'>Home</Link>
          <Link to='/create'>Create Post</Link>
          <Link to='/'>{currentUser.username}</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
          <div className='header-content'>
          <Link to='/'>Home</Link>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Create Account</Link>
        </div>
        )}
    </div>
  );
}

export default Header;