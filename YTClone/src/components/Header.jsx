import { FaYoutube, FaSearch, FaMicrophone, FaBell, FaUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Header(prop) {
  const { toggleSidebar, onSearch } = prop;
  const [searchQuery, setSearchQuery] = useState(''); // State to manage search query
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to manage dropdown visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const [username, setUsername] = useState(''); // State to manage username
  const [channelName, setChannelName] = useState(''); // State to manage channel name
  const [avatar, setAvatar] = useState(''); // State to manage avatar URL
  const navigate = useNavigate(); // Hook to navigate programmatically
  const location = useLocation(); // Hook to get the current location

  // Effect to load user data from localStorage when the location changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    const storedChannelName = localStorage.getItem('channelName');
    const storedAvatar = localStorage.getItem('avatar'); // Assuming avatar URL is stored in localStorage
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setChannelName(storedChannelName);
      setAvatar(storedAvatar);
    } else {
      setIsLoggedIn(false);
      setUsername('');
      setChannelName('');
      setAvatar('');
    }
  }, [location]);

  // Function to handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Function to handle sign-in
  const handleSignIn = () => {
    navigate('/signin');
  };

  // Function to handle sign-out
  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('channelName');
    localStorage.removeItem('avatar'); // Remove avatar from localStorage
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 bg-#0f0f0f flex items-center p-2 shadow-md w-full z-50"> {/* Header container */}
      <div className="flex items-center p-2"> {/* Logo and sidebar toggle */}
        <GiHamburgerMenu className="text-3xl text-white cursor-pointer mr-4" onClick={toggleSidebar} />
        <FaYoutube className="text-red-600 text-4xl mr-2" />
        <span className="text-xl font-semibold text-white hidden sm:block">YouTube</span>
      </div>

      <div className="flex-grow mx-5 flex items-center justify-center"> {/* Search bar */}
        <form onSubmit={handleSearch} className="flex items-center w-full max-w-screen-md rounded-3xl border border-gray-700 overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-5 outline-none bg-#0f0f0f text-white border-none"
          />
          <button type="submit" className="p-3 bg-gray-800 border-l h-full rounded-r-3xl border-gray-800">
            <FaSearch className="text-xl text-white bg-gray-800" />
          </button>
        </form>
      </div>

      <div className="relative flex items-center space-x-4"> {/* User actions */}
        <FaMicrophone className="text-xl text-white cursor-pointer" />
        <FaBell className="text-xl text-white cursor-pointer" />
        {isLoggedIn ? (
          <>
            {avatar ? (
              <img
                src={avatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />
            ) : (
              <FaUserCircle className="size-10 text-xl text-white cursor-pointer" onClick={toggleDropdown} />
            )}
            {dropdownVisible && (
              <div className="absolute top-8 right-5 mt-2 w-48 border-2 border-red-600 bg-white rounded-md shadow-lg z-50"> {/* Dropdown menu */}
                <ul className="py-1">
                  <li className="px-4 py-2 text-white hover:text-black hover:bg-gray-100 cursor-pointer">{username}</li>
                  {channelName && (
                    <li className="px-4 py-2 text-white hover:text-black hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/channel')}>
                      Go to Channel
                    </li>
                  )}
                  <li className="px-4 py-2 text-white hover:text-black hover:bg-gray-100 cursor-pointer" onClick={handleSignOut}>
                    Sign Out
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <button
            className="px-1 py-2 md:text-xl text-xs md:px-4 w-auto bg-black border border-white rounded-3xl text-white hover:bg-white hover:text-black"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;