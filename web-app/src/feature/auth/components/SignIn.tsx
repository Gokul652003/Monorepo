import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase-client';

interface SignInProps {
  isAdmin?: boolean;
}

interface SignInState {
  email: string;
  password: string;
}

const SignIn: React.FC<SignInProps> = ({ isAdmin = false }) => {
  const [state, setState] = useState<SignInState>({
    email: '',
    password: '',
  });

  const emailSignin = async (email: string, password: string) => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleOnSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { email, password } = state;
    emailSignin(email, password);

    setState({ email: '', password: '' });
  };

  return (
    <div
      className={`form-container  ${
        isAdmin ? 'border-red-500 border-2 rounded-lg p-6 bg-red-50 w-full' : 'sign-in-container '
      }`}
    >
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-4 w-full max-w-sm mx-auto">
        <h1 className={`text-2xl font-bold text-center ${isAdmin ? 'text-red-700' : ''}`}>
          {isAdmin ? 'Admin Sign In' : 'Sign In'}
        </h1>

        {!isAdmin && (
          <>
            <div className="social-container flex gap-2 justify-center">
              <a href="#" className="social">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g" />
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in" />
              </a>
            </div>

            <span className="text-center text-sm text-gray-500">or use your account</span>
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder={isAdmin ? 'Admin Email' : 'Email'}
          value={state.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        {!isAdmin && (
          <span className="text-sm text-blue-500 hover:underline">Forgot your password?</span>
        )}

        <button type="submit" className={`py-2 rounded text-white transition cursor-pointer`}>
          {isAdmin ? 'Login as Admin' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
