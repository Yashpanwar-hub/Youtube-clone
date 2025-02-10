import { 
  Home, 
  PlaySquare, 
  Clock, 
  ThumbsUp, 
  History, 
  PlayCircle, 
  Users,
  Flame,
  Music2,
  Gamepad2,
  Newspaper,
  Trophy,
  Film,
  Radio,
  Lightbulb,
  ShoppingBag,
  Settings,
  Flag,
  HelpCircle,
  MessageSquare,
  User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 fixed left-0 top-14 h-[calc(100vh-56px)] overflow-y-auto bg-white">
      <div className="py-2">
        {/* Main Section */}
        <SidebarSection>
          <SidebarItem icon={Home} text="Home" onClick={() => navigate('/')} />
          <SidebarItem 
            icon={PlaySquare} 
            text="Shorts" 
            onClick={() => navigate('/shorts')}
          />
          <SidebarItem 
            icon={Users} 
            text="Subscriptions" 
            onClick={() => navigate('/subscriptions')}
          />
        </SidebarSection>

        {/* You Section */}
        <SidebarSection title="You">
          <SidebarItem 
            icon={History} 
            text="History" 
            onClick={() => navigate('/history')}
          />
          <SidebarItem 
            icon={User} 
            text="Your Channel" 
            onClick={() => navigate('/channel')}
          />
          <SidebarItem 
            icon={Clock} 
            text="Watch Later" 
            onClick={() => navigate('/watch-later')}
          />
          <SidebarItem 
            icon={ThumbsUp} 
            text="Liked Videos" 
            onClick={() => navigate('/liked-videos')}
          />
        </SidebarSection>

        {/* Subscriptions Section */}
        <SidebarSection title="Subscriptions">
          <SidebarItem 
            icon={() => <img src="/t-series.jpg" className="w-6 h-6 rounded-full" />} 
            text="T-Series"
          />
          <SidebarItem 
            icon={() => <img src="/coding.jpg" className="w-6 h-6 rounded-full" />} 
            text="Coding School"
          />
          {/* Add more subscriptions */}
        </SidebarSection>

        {/* Explore Section */}
        <SidebarSection title="Explore">
          <SidebarItem icon={Flame} text="Trending" />
          <SidebarItem icon={Music2} text="Music" />
          <SidebarItem icon={Gamepad2} text="Gaming" />
          <SidebarItem icon={Newspaper} text="News" />
          <SidebarItem icon={Trophy} text="Sports" />
          <SidebarItem icon={Film} text="Movies" />
          <SidebarItem icon={Radio} text="Live" />
        </SidebarSection>

        {/* More from YouTube */}
        <SidebarSection title="More from YouTube">
          <SidebarItem icon={Lightbulb} text="Learning" />
          <SidebarItem icon={ShoppingBag} text="Shopping" />
        </SidebarSection>

        {/* Settings & Help */}
        <SidebarSection>
          <SidebarItem icon={Settings} text="Settings" />
          <SidebarItem icon={Flag} text="Report history" />
          <SidebarItem icon={HelpCircle} text="Help" />
          <SidebarItem icon={MessageSquare} text="Send feedback" />
        </SidebarSection>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 text-xs text-gray-500">
        <div className="flex flex-wrap gap-2 mb-2">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Press</a>
          <a href="#" className="hover:underline">Copyright</a>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Policy & Safety</a>
        </div>
        <p>© 2024 Google LLC</p>
      </div>
    </aside>
  );
};

const SidebarSection = ({ title, children }) => {
  return (
    <div className="pb-4 border-b border-gray-200">
      {title && <h3 className="px-3 pt-6 pb-1 text-base text-gray-600">{title}</h3>}
      {children}
    </div>
  );
};

const SidebarItem = ({ icon: Icon, text, onClick, active }) => {
  return (
    <div 
      className={`flex items-center gap-4 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer ${active ? 'font-medium' : ''}`}
      onClick={onClick}
    >
      <Icon size={20} />
      <span>{text}</span>
    </div>
  );
};

export default Sidebar; 