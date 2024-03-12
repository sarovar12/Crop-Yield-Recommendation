import { useState } from 'react';
import { LoginUser } from '../../api/UserAPI';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log(email, password);
  };

  return (
    <div className="bg-slate-300 w-full h-full">
      <form
        onSubmit={handleLogin}
        className="bg-blue text-center w-1/3 px-3 py-4 text-black mx-auto rounded"
      >
        <input
          type="text"
          placeholder="Username"
          className="block w-full mx-auto text-sm py-2 px-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full mx-auto text-sm py-2 px-3 rounded my-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-300 text-white font-bold py-2 px-4 rounded border block mx-auto w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
