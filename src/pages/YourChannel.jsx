import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Share2, Search } from 'lucide-react';

const YourChannel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) return null;

  const channelStats = {
    subscribers: "1.2K",
    videos: 45,
    views: "15.6K",
    joinedDate: "Jan 15, 2024"
  };

  const tabs = [
    { id: 'home', label: 'HOME' },
    { id: 'videos', label: 'VIDEOS' },
    { id: 'playlists', label: 'PLAYLISTS' },
    { id: 'community', label: 'COMMUNITY' },
    { id: 'channels', label: 'CHANNELS' },
    { id: 'about', label: 'ABOUT' }
  ];

  return (
    <div className="flex-1 pl-64 pt-14 bg-[#f9f9f9] min-h-screen">
      {/* Channel Header */}
      <div className="bg-white">
        {/* Banner */}
        <div className="h-32 md:h-48 lg:h-56 bg-gradient-to-r from-blue-500 to-purple-500" />
        
        {/* Channel Info */}
        <div className="px-6 py-4">
          <div className="flex items-start gap-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full -mt-12 border-4 border-white"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-medium mb-1">{user.name}</h1>
              <div className="text-gray-600 text-sm">
                <p className="mb-1">@{user.name.toLowerCase().replace(/\s+/g, '')}</p>
                <p>{`${channelStats.subscribers} subscribers • ${channelStats.videos} videos • ${channelStats.views} views`}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <Share2 size={20} />
                Share
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <Settings size={20} />
                Customize channel
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 mt-6 border-b">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2 py-3 text-sm font-medium relative ${
                  activeTab === tab.id ? 'text-black' : 'text-gray-600'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Channel Content */}
      <div className="p-6">
        {activeTab === 'home' && (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-lg font-medium mb-4">Featured Videos</h2>
            {/* Add featured videos grid here */}
          </div>
        )}
        {/* Add other tab contents */}
      </div>
    </div>
  );
};

export default YourChannel; 