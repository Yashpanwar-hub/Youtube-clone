import { Grid, List, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

const LikedVideos = () => {
  const [viewMode, setViewMode] = useState('grid');

  const likedVideos = [
    {
      id: 1,
      title: "Indian Army Physical Test Complete Guide 2024",
      channel: "Military Fitness Pro",
      thumbnail: "https://picsum.photos/seed/army2/640/360",
      duration: "28:45",
      views: "45K views",
      timeAgo: "2 weeks ago",
      verified: true,
      channelIcon: "https://picsum.photos/seed/military1/100/100"
    },
    {
      id: 2,
      title: "SSB Interview Tips and Tricks | Officer Training",
      channel: "SSB Guidance",
      thumbnail: "https://picsum.photos/seed/ssb1/640/360",
      duration: "1:15:20",
      views: "22K views",
      timeAgo: "1 month ago",
      verified: true,
      channelIcon: "https://picsum.photos/seed/ssb2/100/100"
    },
    {
      id: 3,
      title: "Complete English Grammar for CDS Exam",
      channel: "Defence English Hub",
      thumbnail: "https://picsum.photos/seed/cds1/640/360",
      duration: "2:10:15",
      views: "18K views",
      timeAgo: "3 weeks ago",
      verified: true,
      channelIcon: "https://picsum.photos/seed/english2/100/100"
    },
    // Add more videos as needed
  ];

  return (
    <div className="flex-1 pl-64 pt-14 bg-[#f9f9f9] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-[#e5e5e5]">
        <div className="flex items-center gap-3">
          <ThumbsUp size={24} className="text-gray-600" />
          <h1 className="text-2xl font-medium">Liked Videos</h1>
          <span className="text-gray-600">({likedVideos.length})</span>
        </div>
        <div className="flex gap-2">
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

      {/* Videos Grid/List */}
      <div className={`p-6 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-4'}`}>
        {likedVideos.map((video) => (
          viewMode === 'grid' ? (
            <GridVideoCard key={video.id} {...video} />
          ) : (
            <ListVideoCard key={video.id} {...video} />
          )
        ))}
      </div>
    </div>
  );
};

// Reuse the VideoCard components from WatchLater.jsx
const GridVideoCard = ({ thumbnail, title, channel, duration, views, timeAgo, verified, channelIcon }) => {
  return (
    <div className="cursor-pointer group">
      <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
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
            {`${views} • ${timeAgo}`}
          </div>
        </div>
      </div>
    </div>
  );
};

const ListVideoCard = ({ thumbnail, title, channel, duration, views, timeAgo, verified, channelIcon }) => {
  return (
    <div className="cursor-pointer flex gap-4 group">
      <div className="relative w-64 aspect-video rounded-xl overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
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
          {`${views} • ${timeAgo}`}
        </div>
      </div>
    </div>
  );
};

export default LikedVideos; 