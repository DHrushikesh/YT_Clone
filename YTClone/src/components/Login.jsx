import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      // Store token, username, and channel name in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('channelName', response.data.channelName);
      localStorage.setItem('avatar', response.data.avatar);
      
      // Handle successful login (e.g., navigate to another page or show a success message)
      navigate('/'); // Navigate to the homepage or another page after successful login
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle login error (e.g., show an error message)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center bg-gray-800">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800">
          <div>
            <label htmlFor="email" className="block text-sm font-medium bg-gray-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2  bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium  bg-gray-800">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold text-black bg-white rounded-md hover:bg-gray-300">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;