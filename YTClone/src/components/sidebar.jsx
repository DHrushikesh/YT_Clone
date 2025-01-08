import { FaHistory, FaShoppingBag, FaMusic, FaFilm, FaTv, FaGamepad, FaNewspaper } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions, MdOutlineWatchLater, MdPlaylistPlay } from "react-icons/md";
import { ImFire } from "react-icons/im";
import { BiLike } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Sidebar(prop) {
  const navigate = useNavigate();
  const { isOpen } = prop; // Destructure 'isOpen' from props

  return (
    <div className={`sticky top-14 left-0 min-h-screen bg-#0f0f0f shadow-md transition-width duration-300 ${isOpen ? 'w-56' : 'w-16'}`}>
      <ul className="space-y-3 mt-6 cursor-pointer">
        <li className="flex items-center p-2 pl-4 hover:bg-gray-700 rounded-md group" onClick={() => navigate('/')}>
          <IoMdHome className="text-2xl bg-#0f0f0f group-hover:bg-gray-700 fill-white mr-1" />
          {isOpen && <span className="text-white group-hover:bg-gray-700 ml-4">Home</span>}
        </li>
        <li className="flex items-center p-2 pl-4 hover:bg-gray-700 rounded-md group">
          <SiYoutubeshorts className="text-2xl bg-#0f0f0f group-hover:bg-gray-700 fill-white mr-1" />
          {isOpen && <span className="text-white group-hover:bg-gray-700 ml-4">Shorts</span>}
        </li>
        <li className="flex items-center p-2 pl-4 hover:bg-gray-700 rounded-md group">
          <MdSubscriptions className="text-2xl bg-#0f0f0f group-hover:bg-gray-700 fill-white mr-1" />
          {isOpen && <span className="text-white group-hover:bg-gray-700 ml-4">Subscriptions</span>}
        </li>
      </ul>

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-400 pl-4">{isOpen && "You"}</h3>
        <ul className="space-y-2 mt-2">
          <li className="flex items-center p-2 pl-4 hover:bg-gray-700 rounded-md group">
            <FaHistory className="text-2xl bg-#0f0f0f group-hover:bg-gray-700 fill-white mr-1" />
            {isOpen && <span className="text-white group-hover:bg-gray-700 ml-4">History</span>}
          </li>
          <li className="flex items-center p-2 pl-4 hover:bg-gray-700 rounded-md group">
            <MdPlaylistPlay className="text-2xl bg-#0f0f0f group-hover:bg-gray-700 fill-white mr-1" />
            {isOpen && <span className="text-white group-hover:bg-gray-700 ml-4">Playlists</span>}
          </li>
          <li className="flex items-center p-2 pl-4 hover:bg-gray-700 rounded-md group">
            <MdOutlineWatchLater className="text-2xl bg-#0f0f0f group-hover:bg-gray-700 fill-white mr-1" />
            {isOpen && <span className="text-white group-hover:bg-gray-700 ml-4">Watch later</span>}
          </li>
          <li className="flex items-center p-2 pl-4 hover:bg-gray-700 rounded-md group">
            <BiLike className="text-2xl bg-#0f0f0f group-hover:bg-gray-700 fill-white mr-1" />
            {isOpen && <span className="text-white group-hover:bg-gray-700 ml-4">Liked videos</span>}
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-400 pl-4">{isOpen && "Explore"}</h3>
        <ul className="space-y-2 mt-2">
          <li className="flex items-center p-2 pl-4 hover:bg-gray-700 rounded-md group">
            <ImFire className="text-2xl bg-#0f0f0f group-hover:bg-gray-700 fill-white mr-1" />
            {isOpen && <span className="text-white group-hover:bg-gray-700 ml-4">Trending</span>}
          </li>
          <li className="flex items-center p-2 pl-4 hover:bg-gray-700 rounded-md group">
            <FaShoppingBag className="text-2xl bg-#0f0f0f group-hover:bg-gray-700 fill-white mr-1" />
            {isOpen && <span className="text-white group-hover:bg-gray-700 ml-4">Shopping</span>}
          </li>
          <li className="flex items-center p-2 pl-4 hover:bg-gray-700 rounded-md group">
            <FaMusic className="text-2xl bg-#0f0f0f group-hover:bg-gray-700 fill-white mr-1" />
            {isOpen && <span className="text-white group-hover:bg-gray-700 ml-4">Music</span>}
          </li>
          <li className="flex items-center p-2 pl-4 hover:bg-gray-700 rounded-md group">
            <FaFilm className="text-2xl bg-#0f0f0f group-hover:bg-gray-700 fill-white mr-1" />
            {isOpen && <span className="text-white group-hover:bg-gray-700 ml-4">Movies</span>}
          </li>
          <li className="flex items-center p-2 pl-4 hover:bg-gray-700 rounded-md group">
            <FaTv className="text-2xl bg-#0f0f0f group-hover:bg-gray-700 fill-white mr-1" />
            {isOpen && <span className="text-white group-hover:bg-gray-700 ml-4">Live</span>}
          </li>
          <li className="flex items-center p-2 pl-4 hover:bg-gray-700 rounded-md group">
            <FaGamepad className="text-2xl bg-#0f0f0f group-hover:bg-gray-700 fill-white mr-1" />
            {isOpen && <span className="text-white group-hover:bg-gray-700 ml-4">Gaming</span>}
          </li>
          <li className="flex items-center p-2 pl-4 hover:bg-gray-700 rounded-md group">
            <FaNewspaper className="text-2xl bg-#0f0f0f group-hover:bg-gray-700 fill-white mr-1" />
            {isOpen && <span className="text-white group-hover:bg-gray-700 ml-4">News</span>}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;