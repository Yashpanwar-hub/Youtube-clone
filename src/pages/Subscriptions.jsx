import { Grid, List } from 'lucide-react';
import { useState } from 'react';

const Subscriptions = () => {
  const [viewMode, setViewMode] = useState('grid');

  const subscriptionVideos = [
    {
      id: 1,
      title: "Reasoning For All Defence Exam | Non Verbal Reasoning | अर्जुन सीरीज़",
      channel: "Rojgar with Ankit Defence",
      thumbnail: "https://picsum.photos/seed/defence1/640/360",
      isLive: true,
      viewers: "217 watching",
      verified: true,
      channelIcon: "https://picsum.photos/seed/ankit/100/100"
    },
    {
      id: 2,
      title: "Airforce Practice Set 2025 | Mechanical Properties of Liquids | Physics",
      channel: "Rojgar with Ankit Defence",
      thumbnail: "https://picsum.photos/seed/airforce1/640/360",
      duration: "45:41",
      views: "1.2K views",
      timeAgo: "17 minutes ago",
      verified: true,
      channelIcon: "https://picsum.photos/seed/ankit/100/100"
    },
    {
      id: 3,
      title: "ICG GD & DB 01 2026 | Coast Guard Practice Set #11 | Science For Navy",
      channel: "Rojgar with Ankit Defence",
      thumbnail: "https://picsum.photos/seed/navy1/640/360",
      duration: "40:26",
      views: "827 views",
      timeAgo: "12 hours ago",
      verified: true,
      channelIcon: "https://picsum.photos/seed/ankit/100/100"
    },
    {
      id: 4,
      title: "Army Technical Maths 2025 | Complete Practice Set with Solutions",
      channel: "Defence Academy",
      thumbnail: "https://picsum.photos/seed/army1/640/360",
      duration: "1:15:33",
      views: "2.3K views",
      timeAgo: "3 hours ago",
      verified: true,
      channelIcon: "https://picsum.photos/seed/defence/100/100"
    },
    {
      id: 5,
      title: "One Shot Maths for Airforce X 01/2026 | NDA/NAVY Preparation",
      channel: "Military Math Hub",
      thumbnail: "https://picsum.photos/seed/maths1/640/360",
      duration: "2:03:15",
      views: "5.1K views",
      timeAgo: "1 day ago",
      verified: true,
      channelIcon: "https://picsum.photos/seed/math/100/100"
    },
    {
      id: 6,
      title: "GK/GS for Army Recruitment 2025 | CISF Fireman 2024",
      channel: "Defence GK Pro",
      thumbnail: "https://picsum.photos/seed/gk1/640/360",
      isLive: true,
      viewers: "1.2K watching",
      verified: true,
      channelIcon: "https://picsum.photos/seed/gk/100/100"
    },
    {
      id: 7,
      title: "Complete Physics Marathon | All Topics Covered | Defence Exams 2025",
      channel: "Physics Master",
      thumbnail: "https://picsum.photos/seed/physics1/640/360",
      duration: "4:45:21",
      views: "12K views",
      timeAgo: "2 days ago",
      verified: true,
      channelIcon: "https://picsum.photos/seed/physics/100/100"
    },
    {
      id: 8,
      title: "English Grammar Masterclass | SSB Interview Preparation",
      channel: "SSB Guide",
      thumbnail: "https://picsum.photos/seed/english1/640/360",
      duration: "1:30:45",
      views: "3.4K views",
      timeAgo: "5 hours ago",
      verified: true,
      channelIcon: "https://picsum.photos/seed/ssb/100/100"
    },
    {
      id: 9,
      title: "Current Affairs 2024 | Monthly Compilation | All Defence Exams",
      channel: "Current Affairs Pro",
      thumbnail: "https://picsum.photos/seed/current1/640/360",
      isLive: true,
      viewers: "856 watching",
      verified: true,
      channelIcon: "https://picsum.photos/seed/current/100/100"
    },
    {
      id: 10,
      title: "Chemistry Practice Set | Navy MR Preparation | Complete Guide",
      channel: "Chemistry Expert",
      thumbnail: "https://picsum.photos/seed/chemistry1/640/360",
      duration: "2:15:30",
      views: "1.8K views",
      timeAgo: "1 day ago",
      verified: true,
      channelIcon: "https://picsum.photos/seed/chemistry/100/100"
    }
  ];

  return (
    <div className="flex-1 pl-64 pt-14 bg-[#f9f9f9] min-h-screen">
      {/* Header with Manage button */}
      <div className="flex justify-between items-center p-6 border-b border-[#e5e5e5]">
        <h1 className="text-2xl font-medium">Latest</h1>
        <div className="flex items-center gap-4">
          <button className="text-blue-600 font-medium hover:bg-blue-50 px-4 py-2 rounded-full">
            Manage
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

      {/* Videos Grid/List with hover effects */}
      <div className={`p-6 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-4'}`}>
        {subscriptionVideos.map((video) => (
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

const GridVideoCard = ({ thumbnail, title, channel, isLive, viewers, duration, views, timeAgo, verified, channelIcon }) => {
  return (
    <div className="cursor-pointer">
      <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover"
        />
        {isLive ? (
          <div className="absolute bottom-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            LIVE
          </div>
        ) : (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
            {duration}
          </div>
        )}
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
            {isLive ? viewers : `${views} • ${timeAgo}`}
          </div>
        </div>
      </div>
    </div>
  );
};

const ListVideoCard = ({ thumbnail, title, channel, isLive, viewers, duration, views, timeAgo, verified, channelIcon }) => {
  return (
    <div className="cursor-pointer flex gap-4">
      <div className="relative w-64 aspect-video rounded-xl overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover"
        />
        {isLive ? (
          <div className="absolute bottom-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            LIVE
          </div>
        ) : (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
            {duration}
          </div>
        )}
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
          {isLive ? viewers : `${views} • ${timeAgo}`}
        </div>
      </div>
    </div>
  );
};

export default Subscriptions; 