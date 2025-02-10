import { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, Share, MoreVertical, Music2 } from 'lucide-react';

const Shorts = () => {
  const [currentShortIndex, setCurrentShortIndex] = useState(0);

  const shorts = [
    {
      id: 1,
      video: "https://picsum.photos/seed/short1/720/1280",
      title: "Defence Physical Training Tips 💪 #shorts",
      creator: "Military Fitness Pro",
      likes: "45K",
      comments: "1.2K",
      description: "Quick tips for your physical preparation! Follow for more fitness advice. #defence #military #fitness",
      avatar: "https://picsum.photos/seed/creator1/100/100",
      music: "Original Sound - Military Fitness Pro",
      isLiked: false
    },
    {
      id: 2,
      video: "https://picsum.photos/seed/short2/720/1280",
      title: "SSB Interview Hacks 🎯 #defence #shorts",
      creator: "SSB Guide",
      likes: "32K",
      comments: "856",
      description: "Top 3 SSB interview tips that nobody tells you about! Watch till the end for the best tip! 🔥",
      avatar: "https://picsum.photos/seed/creator2/100/100",
      music: "Motivational Background - SSB Guide",
      isLiked: true
    },
    {
      id: 3,
      video: "https://picsum.photos/seed/short3/720/1280",
      title: "Quick Maths Trick for Defence Exams ✏️ #study #shorts",
      creator: "Defence Math Pro",
      likes: "28K",
      comments: "945",
      description: "Solve these problems in seconds with this simple trick! 🧮 #mathematics #defence #study",
      avatar: "https://picsum.photos/seed/creator3/100/100",
      music: "Tutorial Background Music",
      isLiked: false
    },
    {
      id: 4,
      video: "https://picsum.photos/seed/short4/720/1280",
      title: "Army Life Reality Check 🪖 #army #shorts",
      creator: "Army Insider",
      likes: "56K",
      comments: "2.3K",
      description: "What they don't tell you about army life! Watch till the end. 🎖️ #military #armylife",
      avatar: "https://picsum.photos/seed/creator4/100/100",
      music: "Patriotic Theme - Army Insider",
      isLiked: false
    },
    {
      id: 5,
      video: "https://picsum.photos/seed/short5/720/1280",
      title: "Navy Training Routine 🌊 #navy #shorts",
      creator: "Naval Academy Guide",
      likes: "38K",
      comments: "1.5K",
      description: "Day in the life of a naval cadet! Follow for more navy content 🚢",
      avatar: "https://picsum.photos/seed/creator5/100/100",
      music: "Sea Waves - Naval Beats",
      isLiked: false
    },
    {
      id: 6,
      video: "https://picsum.photos/seed/short6/720/1280",
      title: "Air Force Pilot Training ✈️ #airforce #shorts",
      creator: "Sky Warriors",
      likes: "62K",
      comments: "2.8K",
      description: "Behind the scenes of pilot training! 🛩️ #aviation #pilot",
      avatar: "https://picsum.photos/seed/creator6/100/100",
      music: "Flight Theme - Sky Warriors",
      isLiked: false
    }
  ];

  const handleScroll = (e) => {
    if (e.deltaY > 0 && currentShortIndex < shorts.length - 1) {
      setCurrentShortIndex(prev => prev + 1);
    } else if (e.deltaY < 0 && currentShortIndex > 0) {
      setCurrentShortIndex(prev => prev - 1);
    }
  };

  return (
    <div 
      className="flex-1 pl-64 pt-14 bg-black min-h-screen"
      onWheel={handleScroll}
    >
      <div className="max-w-[400px] mx-auto h-[calc(100vh-56px)] relative">
        {shorts.map((short, index) => (
          <div 
            key={short.id}
            className={`absolute inset-0 transition-all duration-500 ${
              index === currentShortIndex 
                ? 'translate-y-0 opacity-100 scale-100' 
                : index < currentShortIndex 
                  ? '-translate-y-full opacity-0 scale-95'
                  : 'translate-y-full opacity-0 scale-95'
            }`}
          >
            {/* Video Container */}
            <div className="relative h-full rounded-lg overflow-hidden">
              <img 
                src={short.video} 
                alt={short.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                {/* Creator Info */}
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src={short.avatar}
                    alt={short.creator}
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <span className="text-white font-medium">{short.creator}</span>
                  <button className="ml-auto bg-red-600 hover:bg-red-700 transition-colors text-white px-4 py-1.5 rounded-full text-sm font-medium">
                    Subscribe
                  </button>
                </div>

                {/* Description */}
                <p className="text-white text-sm mb-4">{short.description}</p>

                {/* Music Info */}
                <div className="flex items-center gap-2 text-white text-sm mb-4">
                  <Music2 size={16} />
                  <span className="truncate">{short.music}</span>
                </div>
              </div>

              {/* Right Side Actions */}
              <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6">
                {/* Like */}
                <button className="group flex flex-col items-center text-white">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full 
                    ${short.isLiked ? 'bg-blue-500' : 'bg-black/50'} 
                    group-hover:bg-gray-800 transition-colors`}>
                    <ThumbsUp size={24} fill={short.isLiked ? 'white' : 'none'} />
                  </div>
                  <span className="text-sm mt-1">{short.likes}</span>
                </button>

                {/* Dislike */}
                <button className="group flex flex-col items-center text-white">
                  <div className="w-12 h-12 flex items-center justify-center bg-black/50 rounded-full group-hover:bg-gray-800 transition-colors">
                    <ThumbsDown size={24} />
                  </div>
                </button>

                {/* Comments */}
                <button className="group flex flex-col items-center text-white">
                  <div className="w-12 h-12 flex items-center justify-center bg-black/50 rounded-full group-hover:bg-gray-800 transition-colors">
                    <MessageCircle size={24} />
                  </div>
                  <span className="text-sm mt-1">{short.comments}</span>
                </button>

                {/* Share */}
                <button className="group flex flex-col items-center text-white">
                  <div className="w-12 h-12 flex items-center justify-center bg-black/50 rounded-full group-hover:bg-gray-800 transition-colors">
                    <Share size={24} />
                  </div>
                  <span className="text-sm mt-1">Share</span>
                </button>

                {/* More */}
                <button className="group flex flex-col items-center text-white">
                  <div className="w-12 h-12 flex items-center justify-center bg-black/50 rounded-full group-hover:bg-gray-800 transition-colors">
                    <MoreVertical size={24} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Indicators */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1">
          {shorts.map((_, index) => (
            <div 
              key={index}
              className={`w-1 h-8 rounded-full transition-all duration-300 ${
                index === currentShortIndex 
                  ? 'bg-white scale-y-100' 
                  : 'bg-white/30 scale-y-75'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shorts; 