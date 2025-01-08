import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddVideo() {
  const [newVideo, setNewVideo] = useState({
    title: '',
    thumbnailUrl: '',
    YTURl: '',
    description: '',
    views: 0,
    likes: 0,
    dislikes: 0,
    genre: '',
    uploadDate: '',
  }); // State to manage new video details
  const [error, setError] = useState(''); // State to manage error messages
  const channelName = localStorage.getItem('channelName'); // Get channel name from localStorage
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVideo({ ...newVideo, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      ...newVideo,
      channelName,
      uploader: localStorage.getItem('username'),
    };
    console.log('Request Body:', requestBody); // Log the request body

    try {
      const response = await axios.post('http://localhost:9000/ytdata', requestBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure the token is prefixed with "Bearer"
        },
      });
      console.log('Response:', response.data); // Log the response data
      navigate('/channel'); // Navigate to the channel page
    } catch (error) {
      console.error('Error adding video:', error.response ? error.response.data : error.message); // Log the error response data
      setError('Error adding video');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-black text-white min-h-screen"> {/* Main container */}
      
      <h1 className="text-3xl font-bold mb-4">Add Video</h1> {/* Page title */}
      
      {error && <p className="text-red-500">{error}</p>} {/* Error message */}
      
      <form onSubmit={handleSubmit} className="mt-4 space-y-4"> {/* Form for adding video */}
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newVideo.title}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="thumbnailUrl" className="block text-sm font-medium">Thumbnail URL</label>
          <input
            type="text"
            id="thumbnailUrl"
            name="thumbnailUrl"
            value={newVideo.thumbnailUrl}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="YTURl" className="block text-sm font-medium">YouTube URL</label>
          <input
            type="text"
            id="YTURl"
            name="YTURl"
            value={newVideo.YTURl}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            value={newVideo.description}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          ></textarea>
        </div>
        
        <div>
          <label htmlFor="genre" className="block text-sm font-medium">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={newVideo.genre}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="uploadDate" className="block text-sm font-medium">Upload Date</label>
          <input
            type="date"
            id="uploadDate"
            name="uploadDate"
            value={newVideo.uploadDate}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-2 mt-4 font-semibold text-black bg-white rounded-md hover:bg-gray-300"
        >
          Add Video
        </button>
      
      </form>
    
    </div>
  );
}

export default AddVideo;