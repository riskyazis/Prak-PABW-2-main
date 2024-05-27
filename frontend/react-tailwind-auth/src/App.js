import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfile from './components/home/profile';
import EmailVerification from './components/authform/EmailVerification';
import LoginCard from './components/authform/login2';
import RegisterCard from './components/authform/register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginCard />} />
        <Route path="/register" element={<RegisterCard />} />
        <Route path="/home" element={<UserProfile />} />
        <Route path="/verify-email" element={<EmailVerification />} />
      </Routes>
    </Router>
  );
}

export default App;