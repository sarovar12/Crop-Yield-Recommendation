import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { RegisterUser } from '../../api/UserAPI';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  function toggleEyes() {
    setShowPassword((prevState) => !prevState);
  }

  function validateForm() {
    let isValid = true;

    if (username.trim().length < 4) {
      setUsernameError('Username must be at least 4 characters long');
      isValid = false;
    } else {
      setUsernameError('');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await RegisterUser(email, password, username);
      if (response) {
        toast.success('User Register Successful');
        navigate('/login');
      }
    } catch {
      toast.error('Failed to Register User');
    }
  }

  return (
    <section className="h-[100vh] flex">
      {/* Left side - Signup form */}
      <div className="w-1/2 bg-white shadow-lg rounded-lg p-8 mt-4 flex flex-col justify-center items-center">
        <h1 className="text-3xl pt-5 text-center font-bold text-green-700">
          Sign Up
        </h1>
        <div className="flex justify-center flex-wrap items-center px-6 py-12 w-full">
          <form onSubmit={onSubmit} className="w-full">
            <input
              className={`w-full mb-2 px-4 py-2 text-xl text-gray-700 bg-white border ${
                usernameError ? 'border-red-500' : 'border-gray-300'
              } rounded transition ease-in-out`}
              type="text"
              id="fullName"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            {usernameError && (
              <p className="text-red-500 text-xs mb-2">{usernameError}</p>
            )}
            <input
              className={`w-full mb-2 px-4 py-2 text-xl text-gray-700 bg-white border ${
                emailError ? 'border-red-500' : 'border-gray-300'
              } rounded transition ease-in-out`}
              type="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {emailError && (
              <p className="text-red-500 text-xs mb-2">{emailError}</p>
            )}
            <div className="relative mb-2">
              <input
                className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border ${
                  passwordError ? 'border-red-500' : 'border-gray-300'
                } rounded transition ease-in-out`}
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  onClick={toggleEyes}
                  className="absolute right-3 top-3 text-xl cursor-pointer text-green-600"
                />
              ) : (
                <AiFillEye
                  onClick={toggleEyes}
                  className="absolute right-3 top-3 text-xl cursor-pointer text-green-600"
                />
              )}

              {passwordError && (
                <p className="text-red-500 text-xs mb-2">{passwordError}</p>
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <Link to="/login">
                <p className="text-purple-800 mb-6"> Have an Account?</p>
              </Link>
            </div>
            <button
              className="w-full rounded bg-green-600 text-white px-7 py-3 text-sm font-medium uppercase shadow-md hover:bg-green-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-green-800"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Right side - Background image (Contracted) */}
      <div className="w-1/2 relative">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div
          className="w-full h-full bg-cover bg-center transform scale-95"
          style={{ backgroundImage: "url('/src/assets/img2.jpg')" }}
        ></div>
      </div>
    </section>
  );
}

export default Signup;
