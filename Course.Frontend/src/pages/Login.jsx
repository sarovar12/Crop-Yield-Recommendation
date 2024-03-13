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
    <section className="h-[100vh] bg-slate-300">
      <div className="flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-8 mt-4 w-full max-w-xl">
          <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>
          <div className="flex justify-center flex-wrap items-center px-6 py-12">
            <form onSubmit={handleLogin} className="w-full">
              <input
                className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
              />
              <div className="relative mb-6">
                <input
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? (
                  <AiFillEyeInvisible
                    onClick={toggleEyes}
                    className="absolute right-3 top-3 text-size-xl cursor-pointer"
                  />
                ) : (
                  <AiFillEye
                    onClick={toggleEyes}
                    className="absolute right-3 top-3 text-size-xl cursor-pointer"
                  />
                )}
              </div>
              {error && <p className="text-red-500 mb-6">{error}</p>}
              <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
                <p className="mb-6">
                  Do Not Have An Account?
                  <Link
                    className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                    to="/signup"
                  >
                    Register
                  </Link>
                </p>
              </div>
              <button
                className="w-full rounded bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
                type="submit"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
