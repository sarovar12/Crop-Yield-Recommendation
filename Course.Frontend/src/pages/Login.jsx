import { useState } from 'react';
import { LoginUser } from '../../api/UserAPI';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function toggleEyes() {
    setShowPassword((prevState) => !prevState);
  }

  async function handleLogin(e) {
    e.preventDefault();

    const token = await LoginUser(email, password);
    if (token.succeed) {
      Cookies.set('LoginUser', token.data);
      navigate('/');
      toast.success('User Logged in Successfully');
    } else {
      setError(token.error);
    }
  }

  return (
    <section className="h-[100vh] flex">
      {/* Left side - Background image with overlay */}
      <div className="w-1/2 relative">
        <div
          className="absolute inset-0 bg-black opacity-30" // This will add a semi-transparent overlay
        ></div>
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/src/assets/img1.jpg')" }}
        ></div>
      </div>

      {/* Right side - Login form */}
      <div className="w-1/2 bg-white shadow-lg rounded-lg p-8 mt-4 flex flex-col justify-center items-center">
        <h1 className="text-3xl text-center mt-6 font-bold text-green-700">
          Welcome to Crop Yield Recommendation System
        </h1>
        <h2 className="text-2xl text-center text-gray-700 mt-4 mb-8">
          Sign In
        </h2>
        <div className="flex justify-center flex-wrap items-center px-6 py-12 w-full">
          <form onSubmit={handleLogin} className="w-full">
            <input
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
            <div className="relative mb-6">
              <input
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500"
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            </div>
            {error && <p className="text-red-500 mb-6">{error}</p>}
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Do Not Have An Account?
                <Link
                  className="text-green-600 hover:text-green-700 transition duration-200 ease-in-out ml-1"
                  to="/signup"
                >
                  Register
                </Link>
              </p>
            </div>
            <button
              className="w-full rounded bg-green-600 text-white px-7 py-3 text-sm font-medium uppercase shadow-md hover:bg-green-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-green-800"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
