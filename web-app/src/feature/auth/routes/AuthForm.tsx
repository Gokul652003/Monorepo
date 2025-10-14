import React, { useState } from 'react';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';

export const AuthForm: React.FC = () => {
  const [authMode, setAuthMode] = useState<'signIn' | 'signUp'>('signIn');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleOnClick = (text: 'signIn' | 'signUp') => {
    if (text !== authMode) {
      setAuthMode(text);
    }
  };

  const toggleAdminMode = () => {
    setIsAdmin((prev) => !prev);
  };

  const containerClass = 'container ' + (authMode === 'signUp' ? 'right-panel-active' : '');

  return (
    <div className="auth-form-wrapper flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">{isAdmin ? 'Admin Sign In' : 'Sign In / Sign Up'}</h2>

      <div className={containerClass} id="container">
        {/* Show SignUp only for normal users */}
        {!isAdmin && <SignUp />}

        {/* SignIn shared for both admin and user */}
        <SignIn isAdmin={isAdmin} />

        {/* Overlay only for normal users */}
        {!isAdmin && (
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost" id="signIn" onClick={() => handleOnClick('signIn')}>
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost" id="signUp" onClick={() => handleOnClick('signUp')}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Admin toggle */}
      <div className="mt-6">
        <button
          onClick={toggleAdminMode}
          className="text-blue-600 underline hover:text-blue-800 transition"
        >
          {isAdmin ? 'Back to User Sign In' : 'Sign in as Admin'}
        </button>
      </div>
    </div>
  );
};
