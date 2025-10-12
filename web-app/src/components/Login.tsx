import { useState } from 'react';
import emailIcon from '../assets/emailIcon.svg';
import passwordIcon from '../assets/passwordIcon.svg';
import showPassword from '../assets/showPassword.svg';
import hidePassword from '../assets/hidePassword.svg';
import TextField from './TextField';

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="flex flex-col gap-4 items-center">
        <div className="text-3xl text-[#155f82] font-bold pb-2">
          Sign in
        </div>

        <form className="flex flex-col gap-2 min-w-[300px]">
          {!isAdminLogin && (
            <TextField label="Email" type="text" leftIcon={emailIcon} />
          )}

          <TextField
            label="Password"
            type={isShowPassword ? 'text' : 'password'}
            leftIcon={passwordIcon}
            rightIcon={isShowPassword ? hidePassword : showPassword}
            rightIconOnClick={() => setIsShowPassword(!isShowPassword)}
          />

          <div className="flex flex-col gap-1 font-medium mt-2">
            {!isAdminLogin && (
              <span className="text-xs self-end text-[#6358dc] cursor-pointer">
                Forgot Password
              </span>
            )}

            <button
              className="text-[#fff] bg-[#155f82] w-full py-2 rounded-lg"
              type="submit"
            >
              {isAdminLogin ? 'Login as Admin' : 'Login'}
            </button>

            <span
              className="text-xs text-[#6358dc] text-center mt-3 cursor-pointer"
              onClick={() => setIsAdminLogin(!isAdminLogin)}
            >
              {isAdminLogin
                ? 'Switch to User Login'
                : 'Switch to Admin Login'}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
