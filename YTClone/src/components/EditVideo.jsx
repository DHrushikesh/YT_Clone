import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditVideo() {
  const { videoId } = useParams(); // Get the video ID from the URL parameters
  const [video, setVideo] = useState({
    title: '',
    thumbnailUrl: '',
    YTURl: '',
    description: '',
    genre: '',
  }); // State to manage video details
  const [error, setError] = useState(''); // State to manage error messages
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Effect to fetch video details when the component mounts
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/ytdata/${videoId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token in the request headers
          },
        });
        setVideo(response.data); // Set the video details in the state
      } catch (error) {
        setError('Error fetching video', error); // Set error message if fetching fails
      }
    };

    fetchVideo();
  }, [videoId]);

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideo({ ...video, [name]: value }); // Update the video state with the new input value
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9000/ytdata/edit/${videoId}`, video, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token in the request headers
        },
      });
      alert("Video updated successfully"); // Show success message
      navigate('/'); // Navigate to the home page
    } catch (error) {
      setError('Error updating video', error); // Set error message if updating fails
    }
  };

  // Show loading message if video details are not yet fetched
  if (!video.title && !video.thumbnailUrl && !video.YTURl && !video.description && !video.genre) {
    return <div className="container mx-auto p-4 bg-black text-white min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-black text-white min-h-screen"> {/* Main container */}
      <h1 className="text-3xl font-bold mb-4">Edit Video</h1> {/* Page title */}
      {error && <p className="text-red-500">{error}</p>} {/* Error message */}
      <form onSubmit={handleSubmit} className="mt-4 space-y-4"> {/* Form for editing video */}
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={video.title}
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
            value={video.thumbnailUrl}
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
            value={video.YTURl}
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
            value={video.description}
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
            value={video.genre}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-2 mt-4 font-semibold text-black bg-white rounded-md hover:bg-gray-300"
        >
          Update Video
        </button>
      
      </form>
    </div>
  );
}

export default EditVideo;