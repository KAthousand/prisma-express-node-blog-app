import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Login.css"

function Login(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const { email, password } = formData;
  const { handleLogin, error } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <div className='login-container'>
      <div className='login-content'>
        <h1>Login</h1>
        <hr />
        <form onSubmit={(e) => {
          e.preventDefault();
          handleLogin(formData);
          if (!error) {
            setFormData({
              email: "",
              password: ""
            })
          }
        }} >
          <label>
            Email: <br/>
              <input
              autoFocus
              name="email"
              type="text"
              value={email}
              onChange={handleChange}
            />
          </label>
          <label>
            Password:<br/>
              <input
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
            />
          </label>
          <hr />
          <button>Login</button>
          {error && (
            <div className='error-container'>
              <div className='error'>
                {error.map((error, idx)=>(<h6 key={idx}>{error}</h6>))}
              </div>
            </div>
          )}
          <p>Dont have an account? <Link to="/register"> Register Here</Link></p>
          
        </form>
      </div>
    </div>
  );
}

export default Login;