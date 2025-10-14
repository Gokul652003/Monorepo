import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase-client';

interface SignUpState {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [state, setState] = useState<SignUpState>({
    name: '',
    email: '',
    password: '',
  });

  const emailSignup = async (email: string, password: string) => {
    await supabase.auth.signUp({
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
    emailSignup(email, password);

    // Reset state
    setState({ name: '', email: '', password: '' });
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
        <h1>Create Account</h1>
        <div className="social-container flex gap-2">
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
        <span>or use your email for registration</span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
