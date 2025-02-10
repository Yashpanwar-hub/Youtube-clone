import { useState } from 'react';
import { Clock, Trash2, Grid, List, Search } from 'lucide-react';

const History = () => {
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');

  const historyVideos = [
    {
      id: 1,
      title: "Complete SSB Interview Guide 2024 | Do's and Don'ts",
      channel: "Defence Career Guide",
      thumbnail: "https://picsum.photos/seed/ssb1/640/360",
      duration: "1:45:21",
      views: "15K views",
      watchedAt: "Watched 2 hours ago",
      progress: 75, // percentage watched
      channelIcon: "https://picsum.photos/seed/channel1/100/100",
      verified: true
    },
    {
      id: 2,
      title: "Physical Fitness Test Preparation | Indian Army",
      channel: "Military Fitness Pro",
      thumbnail: "https://picsum.photos/seed/army2/640/360",
      duration: "28:45",
      views: "45K views",
      watchedAt: "Watched yesterday",
      progress: 100,
      channelIcon: "https://picsum.photos/seed/channel2/100/100",
      verified: true
    },
    // Add more history items...
  ];

  const filteredVideos = historyVideos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.channel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 pl-64 pt-14 bg-[#f9f9f9] min-h-screen">
      {/* Header */}
      <div className="sticky top-14 bg-white z-10 border-b border-[#e5e5e5]">
        <div className="flex justify-between items-center p-6">
          <div className="flex items-center gap-4">
            <Clock size={24} className="text-gray-600" />
            <h1 className="text-2xl font-medium">Watch history</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search watch history"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-64 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-full">
              <Trash2 size={20} />
              Clear all watch history
            </button>
            <div className="flex gap-2 border-l pl-4">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#f2f2f2]' : 'hover:bg-[#f2f2f2]'}`}
              >
                <Grid size={20} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[#f2f2f2]' : 'hover:bg-[#f2f2f2]'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Videos */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6'
        : 'flex flex-col gap-4 p-6'
      }>
        {filteredVideos.map(video => (
          viewMode === 'grid' 
            ? <GridVideoCard key={video.id} {...video} />
            : <ListVideoCard key={video.id} {...video} />
        ))}
      </div>
    </div>
  );
};

const GridVideoCard = ({ thumbnail, title, channel, duration, views, watchedAt, progress, channelIcon, verified }) => {
  return (
    <div className="cursor-pointer group">
      <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div 
            className="h-full bg-red-600"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
      </div>
      <div className="flex gap-3">
        <img 
          src={channelIcon} 
          alt={channel}
          className="w-9 h-9 rounded-full"
        />
        <div>
          <h3 className="font-medium text-sm line-clamp-2 mb-1">
            {title}
          </h3>
          <div className="flex items-center text-sm text-gray-600">
            <span>{channel}</span>
            {verified && (
              <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"/>
              </svg>
            )}
          </div>
          <div className="text-sm text-gray-600">
            {`${views} • ${watchedAt}`}
          </div>
        </div>
      </div>
    </div>
  );
};

const ListVideoCard = ({ thumbnail, title, channel, duration, views, watchedAt, progress, channelIcon, verified }) => {
  return (
    <div className="cursor-pointer flex gap-4 group">
      <div className="relative w-64 aspect-video rounded-xl overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div 
            className="h-full bg-red-600"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-lg mb-2">
          {title}
        </h3>
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <span>{channel}</span>
          {verified && (
            <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"/>
            </svg>
          )}
        </div>
        <div className="text-sm text-gray-600">
          {`${views} • ${watchedAt}`}
        </div>
      </div>
    </div>
  );
};

export default History; 