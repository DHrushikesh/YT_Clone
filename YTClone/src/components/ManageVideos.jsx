import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HomePageCard from './HomePageCard'; // Import the HomePageCard component

function ManageVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const channelName = localStorage.getItem('channelName');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.post('http://localhost:9000/ytdata/channel', { channelName });
        setVideos(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setVideos([]);
        } else {
          setError('Error fetching videos');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [channelName]);

  const handleAddVideo = () => {
    navigate('/addvideo');
  };

  const handleEditVideo = (videoId) => {
    navigate(`/editvideo/${videoId}`);
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      await axios.delete(`http://localhost:9000/ytdata/delete/${videoId}`, {
      });
      setVideos(videos.filter(video => video._id !== videoId));
    } catch (error) {
      setError('Error deleting video',error);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4 bg-black text-white min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 bg-black text-white min-h-screen">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Manage Your Videos</h1>
      <button
        onClick={handleAddVideo}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Add Video
      </button>
      <div className="mt-4 flex flex-wrap gap-4">
        {videos.map(video => (
          <div key={video._id} className="w-64">
            <HomePageCard video={video} />
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEditVideo(video._id)}
                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteVideo(video._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageVideos;