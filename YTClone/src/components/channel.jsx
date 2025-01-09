import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ManageVideos from './ManageVideos';

function Channel() {
  const [channelName, setChannelName] = useState(''); // State to manage channel name
  const [newChannelName, setNewChannelName] = useState(''); // State to manage new channel name input
  const [avatar, setAvatar] = useState(''); // State to manage avatar URL
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Effect to load channel name and avatar from localStorage
  useEffect(() => {
    const storedChannelName = localStorage.getItem('channelName');
    const storedAvatar = localStorage.getItem('avatar');
    if (storedChannelName && storedChannelName.trim() !== '') {
      setChannelName(storedChannelName);
      setAvatar(storedAvatar);
    }
  }, []);

  // Function to handle channel creation
  const handleCreateChannel = async (e) => {
    e.preventDefault();
    if (newChannelName.trim() === '' || avatar.trim() === '') return;

    try {
      const response = await axios.post('http://localhost:9000/createChannel', {
        channelName: newChannelName,
        username: localStorage.getItem('username'),
        avatar: avatar,
      });

      console.log('Channel created:', response.data);
      
      localStorage.setItem('channelName', response.data.channelName);
      localStorage.setItem('avatar', response.data.avatar);
      setChannelName(response.data.channelName);
      setAvatar(response.data.avatar);
      setNewChannelName('');
      navigate('/channel');
    } catch (error) {
      console.error('Error creating channel:', error);
    }
  };

  // Render form to create channel if channel name is not set
  if (channelName === 'undefined' ) {
    return (
      <div className="container mx-auto p-4 bg-black text-white min-h-screen"> {/* Main container */}
        <h1 className="text-3xl font-bold mb-4">Create Your Channel</h1> {/* Page title */}
        <form onSubmit={handleCreateChannel} className="space-y-4"> {/* Form for creating channel */}
          <div>
            <label htmlFor="channelName" className="block text-sm font-medium">Channel Name</label>
            <input
              type="text"
              id="channelName"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          <div>
            <label htmlFor="avatar" className="block text-sm font-medium">Channel Avatar URL</label>
            <input
              type="text"
              id="avatar"
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold text-black bg-white rounded-md hover:bg-gray-300"
          >
            Create Channel
          </button>
        </form>
      </div>
    );
  }

  // Render channel details and manage videos if channel name is set
  return (
    <div className="container mx-auto p-4 bg-black text-white min-h-screen"> {/* Main container */}
      <h1 className="text-3xl font-bold mb-4">Welcome to {channelName} Channel</h1> {/* Channel welcome message */}
      <div className="flex justify-center mb-4"> {/* Avatar container */}
        <img src={avatar} alt={`${channelName}`} className="size-44 rounded-full border-2 border-red-500 " />
      </div>
      {/* Add more channel-specific content here */}
      <ManageVideos /> {/* Manage videos component */}
    </div>
  );
}

export default Channel;
