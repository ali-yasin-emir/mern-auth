import React, { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post('/auth/login', {
        username,
        password,
      });
      localStorage.setItem('currentUser', JSON.stringify(res.data));
      console.log(res.data);
      navigate('/');
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className='login'>
      <form onSubmit={handleSubmit} action=''>
        <h1>Sign in</h1>
        <label htmlFor=''>Username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          name='username'
          type='text'
          placeholder='johndoe'
        />
        <label htmlFor=''>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          ame='password'
          type='password'
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
