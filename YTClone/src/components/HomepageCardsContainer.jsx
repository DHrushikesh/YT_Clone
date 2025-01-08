import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import HomePageCard from "./HomePageCard";
import { setVideos } from "../assets/videosslice";
import { Link, useOutletContext } from "react-router-dom";

const categories = ['All', 'Music', 'Sports', 'Travel', 'Comedy', 'Science', 'Education'];

function HomepageCardsContainer () {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos.videos);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const { searchQuery } = useOutletContext();

  useEffect(() => {
    async function gettingdata() {
      try {
        const maindata = await axios.get('http://localhost:9000/ytdata');
        dispatch(setVideos(maindata.data));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }
    gettingdata();
  }, [dispatch]);

  const filteredVideos = videos.filter(video => 
    (selectedCategory === 'All' || video.genre.toLowerCase().includes(selectedCategory.toLowerCase())) &&
    (searchQuery === '' || video.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-#0f0f0f text-white">
      {/* Categories */}
      <div className="relative mt-4 flex items-center">
        <div className="flex max-w-60dvw max-h-20 space-x-4 overflow-x-hidden pb-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`bg-gray-800 px-3 py-1 rounded-full inline-flex items-center whitespace-nowrap ${
                selectedCategory === category ? 'bg-red-600' : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Videos */}
      <div className="flex flex-wrap gap-7 p-4 ml-auto mr-auto">
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <h1>Loading...</h1>
          </div>
        ) : (
          filteredVideos.length === 0 ? (
            <div className="flex justify-center items-center w-full h-full">
              <h1>No videos found</h1>
            </div>
          ) : (
            filteredVideos.map((video, index) => (
              
              <Link key={index} to={`/videoplayer/${video._id}`}>
                    <HomePageCard key={index} video={video} />
              </Link>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default HomepageCardsContainer;