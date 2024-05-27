import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const LoginCard = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.email.trim() || !loginData.password.trim()) {
      Swal.fire('Error', 'Email and Password are required', 'error');
      return;
    }
    try {
      const response = await fetch('http://localhost:3030/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (response.ok) {
        Cookies.set('token', data.token, { expires: 1 });
        setLoginData({ email: '', password: '' });
        navigate('/home');
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      Swal.fire('Error', 'Login error', 'error');
    }
  };

  return (
    <div className="flip-card">
      <div className="flip-card-front">
        <form onSubmit={handleLoginSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={handleLoginChange}
            value={loginData.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleLoginChange}
            value={loginData.password}
          />
          <button type="submit">Sign in</button>
        </form>
        <p>Don't have an account? <button onClick={() => navigate('/register')}>Register</button></p>
      </div>
    </div>
  );
};

export default LoginCard;
