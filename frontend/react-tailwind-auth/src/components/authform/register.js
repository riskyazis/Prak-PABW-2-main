import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegisterCard = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    dateOfBirth: '',
    photoProfile: null,
  });

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRegisterPhotoChange = (e) => {
    setRegisterData(prev => ({ ...prev, photoProfile: e.target.files[0] }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3030/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(registerData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Registration failed');
      }

      setRegisterData({
        username: '',
        email: '',
        password: '',
        fullName: '',
        dateOfBirth: '',
        photoProfile: null,
      });
  
      Swal.fire('Success', 'Register successful. Redirecting to Gmail for email verification.', 'success')
      .then(() => {
        window.location.href = 'https://mail.google.com';
      });
    } catch (error) {
      console.error('Register failed:', error);
      Swal.fire('Error', 'Register Failed', 'error');
    }
  };
  

  return (
    <div className="flip-card">
      <div className="flip-card-front">
        <form onSubmit={handleRegisterSubmit}>
        <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleRegisterChange}
            value={registerData.username}
        />
        <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={handleRegisterChange}
            value={registerData.email}
        />
        <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleRegisterChange}
            value={registerData.password}
        />
        <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={handleRegisterChange}
            value={registerData.fullName}
        />
        <input
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            onChange={handleRegisterChange}
            value={registerData.dateOfBirth}
        />
        <input
            type="file"
            name="photoProfile"
            onChange={handleRegisterPhotoChange}
        />
        <button type="submit">Register</button>
        </form>

        <p className='color-white-500'>Already have an account? <button onClick={() => navigate('/login')}>Login</button></p>

      </div>
    </div>
  );
};

export default RegisterCard;
