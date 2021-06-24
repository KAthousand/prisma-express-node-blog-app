import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css'

function Register(props) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const { username, email, password } = formData;
  const { handleRegister } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <div className="register-container">
      <div className='register-content'>
        <h2>Register</h2>
        <hr />
        <form onSubmit={(e) => {
          e.preventDefault();
          handleRegister(formData);
        }} >
          <label>
            Username:
          <input
              name="username"
              type="text"
              value={username}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
          <input
              name="email"
              type="text"
              value={email}
              onChange={handleChange}
            />
          </label>
          <label>
            Password:
          <input
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
            />
          </label>
          <hr />
          <button>Register</button>
          <p>Already have an account? <Link to="/login"> Login Here</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Register;