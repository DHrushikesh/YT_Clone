import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/sidebar';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './assets/createstore';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar open/close
  const [searchQuery, setSearchQuery] = useState(''); // State to manage search query

  // Function to toggle sidebar open/close state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to handle search query
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Provider store={store}> {/* Provide Redux store to the app */}
      <div className="flex flex-col min-h-screen bg-#0f0f0f"> {/* Main container */}
        
        <Header toggleSidebar={toggleSidebar} onSearch={handleSearch} /> {/* Header component */}
        
        <div className="flex bg-#0f0f0f"> {/* Container for sidebar and main content */}
          
          <Sidebar className="z-10" isOpen={isSidebarOpen} /> {/* Sidebar component */}
          
          <main className="transition-all duration-300 w-screen overflow-x-auto ml-2 bg-#0f0f0f"> {/* Main content area */}
            <Outlet context={{ searchQuery }} /> {/* Outlet for nested routes */}
          </main>
        
        </div>
      
      </div>
    </Provider>
  );
}

export default App;