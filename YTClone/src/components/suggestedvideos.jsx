import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function SuggestedVideos() {
  const suggestedVideos = useSelector((state) => state.videos.videos); // Access the videos array from the state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Array.isArray(suggestedVideos) && suggestedVideos.length > 0) {
      setLoading(false);
    }
  }, [suggestedVideos]);

  const formatViews = (views) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M';
    }
    return views.toString();
  };

  const calculateTimeAgo = (uploadDate) => {
    const now = new Date();
    const upload = new Date(uploadDate);
    const diffTime = Math.abs(now - upload);
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
    const diffYears = Math.floor(diffMonths / 12);

    if (diffYears > 0) {
      return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
    } else {
      return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    }
  };

  if (loading) {
    return <div>Loading suggested videos...</div>;
  }

  return (
    <div className="w-full flex flex-wrap justify-center">
      {suggestedVideos.map((video, index) => (
        <div key={index} className="w-[500px] mb-4 flex cursor-pointer ">
          <div className="w-2/3  ">
            <img 
              src={video.thumbnailUrl || 'path/to/fallback-image.jpg'} 
              alt={video.title} 
              className="h-auto w-full object-cover rounded-lg hover:border-2 hover:border-red-500" 
            />
          </div>
          <div className="w-2/3 flex flex-col justify-center pl-4">
            <h3 className="text-sm font-semibold">{video.title}</h3>
            <p className="text-xs">{video.channelName}</p>
            <p className="text-xs">{`${formatViews(video.views)} Views • ${calculateTimeAgo(video.uploadDate)}`}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SuggestedVideos;
