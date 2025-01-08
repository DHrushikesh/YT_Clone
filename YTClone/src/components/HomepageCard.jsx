function HomePageCard(prop) {
  // Destructure the 'video' prop
  const { video } = prop;

  // Function to format views count to millions
  const formatViews = (views) => {
    if (views >= 1000000) {
      // If views are greater than or equal to 1 million, format to 'M'
      return (views / 1000000).toFixed(1) + 'M';
    }
    return views.toString();
  };

  // Function to calculate how long ago the video was uploaded
  const calculateTimeAgo = (uploadDate) => {
    const now = new Date(); // Current date and time
    const upload = new Date(uploadDate); // Video upload date
    const diffTime = Math.abs(now - upload); // Time difference in milliseconds
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30)); // Convert to months
    const diffYears = Math.floor(diffMonths / 12); // Convert to years

    if (diffYears > 0) {
      // If more than a year
      return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`; // Singular or plural 'year'
    } else {
      // If less than a year
      return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`; // Singular or plural 'month'
    }
  };

  // Return the JSX for the component
  return (
    <div className="bg-#0f0f0f max-h-[500px] text-white gap-4 md:w-[350px] p-3 min-w-[250px] max-w-screen-md shadow-xl">   
      <img src={`${video.thumbnailUrl}`} alt={`${video.title}`} className="h-[175px] w-full object-cover rounded-lg " />
      <div className="flex justify-self-start items-center mt-2">
        <img src="https://as2.ftcdn.net/v2/jpg/03/11/36/11/1000_F_311361130_q3l1LPO54yq5ldieOFKPi3mXKTDJxaHd.jpg"
          alt="channel" className="size-12 rounded-full border-2 border-red-600 " />
        <div className="ml-2 flex items-start flex-col space-y-1">
          <h3 className="text-sm font-semibold">{`${video.title}`}</h3>
          <p className="text-xs">{`${video.channelName}`}</p>
          <p className="text-xs ">{`${formatViews(video.views)} Views • ${calculateTimeAgo(video.uploadDate)}`}</p>
        </div>
      </div>    
    </div>
  );
}

export default HomePageCard;
