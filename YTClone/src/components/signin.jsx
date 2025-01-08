import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/register', {
        username,
        email,
        password,
      });
      console.log('Registration successful:', response.data);
      // Handle successful registration 
      navigate('/Login');

    } catch (error) {
      console.error('Error registering:', error);
      // Handle registration error 
    }
  };

  return (
    <div className="flex items-center  justify-center min-h-screen bg-black  text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center bg-gray-800">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800">
          <div className='bg-gray-800'>
            <label htmlFor="username" className="block text-sm font-medium bg-gray-800">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium bg-gray-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-2  bg-gray-700 border border-gray-600  focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium bg-gray-800">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" w-full px-2  bg-gray-700 border border-gray-600  focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold text-black bg-white rounded-md hover:bg-gray-300"
          >
            Submit
          </button>

          <div className='flex flex-col justify-center items-center bg-gray-800'> 
            <p className='bg-gray-800'>or </p>
          
          <button type="submit" onClick={() => navigate('/Login')}
            className="w-full  py-2 mt-4 font-semibold text-black bg-white rounded-md hover:bg-gray-300">
                Login
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;