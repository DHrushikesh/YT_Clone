import { useParams , useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import SuggestedVideos from './suggestedvideos';
import CommentsSection from './commentSection';

function VideoPlayer() {
  const { id } = useParams(); // Get the video id from the URL parameters
  const videos = useSelector((state) => state.videos.videos); // Access the videos array from the Redux state
  const [video, setVideo] = useState(null); // State to store the current video
  const storedChannelName = localStorage.getItem('channelName');
  const storedAvatar = localStorage.getItem('avatar');

  const formatViews = (views) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M';
    }
    return views.toString();
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      
      alert('Please sign in first.');
      navigate('/signin');
      
    }
  }, [navigate]);


  useEffect(() => {
    const foundVideo = videos.find((video) => video._id === id); // Find the video with the matching id
    setVideo(foundVideo); // Set the found video to the state
  }, [id, videos]); // Run this effect when the id or videos array changes

  if (!video) {
    return <div className="container w-2/3 mx-auto p-4 bg-black text-white min-h-screen">Loading...</div>; // Show loading message if the video is not found yet
  }

  return (
    <div className="flex flex-wrap bg-black text-white min-h-screen">
      <div className="w-full md:w-2/3 p-4">
        <iframe
          className="w-full h-96"
          src={video.YTURl}
          title={video.title}
          allowFullScreen
        /> {/* Embed the video player */}
        <h2 className="text-xl font-bold my-4">{video.title}</h2> {/* Video title */}
        
        <div className="flex flex-wrap gap-3 items-center mb-4">
        
        <img
        src={video.channelName === storedChannelName ? storedAvatar : "https://as2.ftcdn.net/v2/jpg/03/11/36/11/1000_F_311361130_q3l1LPO54yq5ldieOFKPi3mXKTDJxaHd.jpg"}
        alt="channel"
        className="h-12 w-12 rounded-full border-2 border-red-500 inline-flex mr-3"
      />

          <div>
            <p className="font-semibold text-xl mb-2">{video.channelName}</p> {/* Channel name */}
            <p className="text-xs">{`${formatViews(video.views)} Views`}</p> {/* Number of views */}
          </div>
          <h2 className='ml-3 text-lg font-bold cursor-pointer hover:shadow-lg hover:bg-black hover:text-white
           hover:shadow-red-700 border-2 rounded-2xl py-1 px-2 bg-white text-black'>
            Subscribe</h2>
        
          <div className="flex space-x-2 items-center ml-auto mr-9 justify-end">
            <button className="like-button border border-black bg-gray-800 hover:bg-white hover:text-black rounded-full px-3 py-1">
              {`${video.likes} Likes`}</button> {/* Like button */}
            <button className="dislike-button border border-black bg-gray-800 hover:bg-white hover:text-black rounded-full px-3 py-1">
              {`${video.dislikes} DisLikes`}</button> {/* Dislike button */}
          </div>
        </div>

        <p className="mb-4 w-full text-md bg-gray-600 p-2 rounded-lg h-auto">{video.description}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, sed? Quam cupiditate cumque labore provident, iusto saepe tempora sapiente soluta, fugiat ad necessitatibus obcaecati! Eaque autem cum eos deserunt obcaecati.
        </p> {/* Video description */}

        
        <CommentsSection video={video} /> {/* Include the CommentsSection component */}
      </div>

      <div className="w-full md:w-1/3 p-4 "> 
        <SuggestedVideos /> {/* Suggested videos component */}
      </div>
    </div>
  );
}

export default VideoPlayer;
