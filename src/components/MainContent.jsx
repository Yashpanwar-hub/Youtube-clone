import { Play, Clock } from 'lucide-react';

// Helper function to generate random numbers
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to generate random time ago
const getRandomTimeAgo = () => {
  const units = ['hour', 'day', 'week', 'month', 'year'];
  const amount = random(1, 12);
  const unit = units[random(0, units.length - 1)];
  return `${amount} ${unit}${amount > 1 ? 's' : ''} ago`;
};

// Helper function to generate random views
const getRandomViews = () => {
  const amount = random(1, 999);
  const unit = random(0, 2);
  const units = ['K', 'M', 'B'];
  return `${amount}${units[unit]} views`;
};

// Generate random duration
const getRandomDuration = () => {
  const hours = random(0, 2);
  const minutes = random(0, 59);
  const seconds = random(0, 59);
  return hours > 0 
    ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    : `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Sample channel names and topics
const channels = [
  { name: "Tech Masters", icon: "https://i.pravatar.cc/150?img=1", verified: true },
  { name: "Code Warriors", icon: "https://i.pravatar.cc/150?img=2", verified: true },
  { name: "Web Dev Pro", icon: "https://i.pravatar.cc/150?img=3", verified: false },
  { name: "JavaScript Guru", icon: "https://i.pravatar.cc/150?img=4", verified: true },
  { name: "Python Coders", icon: "https://i.pravatar.cc/150?img=5", verified: false },
  { name: "Data Science Hub", icon: "https://i.pravatar.cc/150?img=6", verified: true },
];

const topics = [
  "Complete Web Development Course",
  "Learn Python Programming",
  "JavaScript Tutorial for Beginners",
  "React.js Crash Course",
  "Node.js Backend Development",
  "MongoDB Database Tutorial",
  "Full Stack MERN Project",
  "Data Structures and Algorithms",
  "Machine Learning Basics",
  "DevOps for Beginners",
];

// Generate random videos
const generateVideos = (count) => {
  return Array(count).fill(null).map((_, id) => ({
    id,
    thumbnail: `https://picsum.photos/seed/${id}/640/360`,
    duration: getRandomDuration(),
    title: topics[random(0, topics.length - 1)],
    channel: channels[random(0, channels.length - 1)].name,
    channelIcon: channels[random(0, channels.length - 1)].icon,
    views: getRandomViews(),
    timestamp: getRandomTimeAgo(),
    verified: Math.random() > 0.5
  }));
};

// Generate random playlists
const generatePlaylists = (count) => {
  return Array(count).fill(null).map((_, id) => ({
    id,
    title: `${topics[random(0, topics.length - 1)]} Playlist`,
    videos: random(10, 100),
    thumbnail: `https://picsum.photos/seed/${id + 100}/640/360`,
    channel: channels[random(0, channels.length - 1)].name
  }));
};

const MainContent = () => {
  const videos = generateVideos(12); // Generate 12 random videos
  const playlists = generatePlaylists(4); // Generate 4 random playlists

  const categories = [
    "All", "JavaScript", "Python", "React", "Node.js", "MongoDB",
    "Web Development", "Data Science", "Machine Learning", "DevOps",
    "Algorithms", "Computer Science", "Mobile Development", "Game Development"
  ];

  return (
    <main className="flex-1 pl-64 pt-14 bg-gray-50">
      {/* Categories */}
      <div className="sticky top-14 bg-white z-10 border-b">
        <div className="flex gap-3 px-6 py-3 overflow-x-auto categories-scroll">
          {categories.map((category, index) => (
            <button 
              key={index}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap
                ${index === 0 ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Playlists Section */}
      <section className="p-6 border-b">
        <h2 className="text-xl font-medium mb-4">Popular Playlists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {playlists.map(playlist => (
            <PlaylistCard key={playlist.id} {...playlist} />
          ))}
        </div>
      </section>

      {/* Videos Grid */}
      <section className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {videos.map(video => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </section>
    </main>
  );
};

const VideoCard = ({ thumbnail, duration, title, channel, channelIcon, views, timestamp, verified }) => {
  return (
    <div className="cursor-pointer group">
      {/* Thumbnail */}
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

      {/* Video Info */}
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <img 
            src={channelIcon} 
            alt={channel}
            className="w-9 h-9 rounded-full"
          />
        </div>
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
            <span>{views}</span>
            <span className="mx-1">•</span>
            <span>{timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlaylistCard = ({ thumbnail, title, videos, channel }) => {
  return (
    <div className="cursor-pointer group">
      <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="w-12 h-12 text-white" />
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {videos} videos
        </div>
      </div>
      <h3 className="font-medium text-sm line-clamp-2 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{channel}</p>
    </div>
  );
};

export default MainContent; 