import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../global.css';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // add logic
    navigate('/');
  };

  return (
    <div className="login-container">
      <video autoPlay muted loop id="myBackgroundVideo">
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>
      <div className="login-box">
        <h2 className="login-header mt-2">LOGIN FORM</h2>
        <form className="form" onSubmit={handleLogin}>
          <div className="user-box">
            <input required type="email" className="input" placeholder="name@company.com" />
          </div>
          <div className="user-box">
            <input required type="password" className="input" placeholder="••••••••" />
          </div>
          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
        <span className="border-anim span1"></span>
        <span className="border-anim span2"></span>
        <span className="border-anim span3"></span>
        <span className="border-anim span4"></span>
      </div>
    </div>
  );
};

export default Login;
