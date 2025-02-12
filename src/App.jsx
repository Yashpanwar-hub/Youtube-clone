import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Subscriptions from './pages/Subscriptions';
import WatchLater from './pages/WatchLater';
import LikedVideos from './pages/LikedVideos';
import Profile from './pages/Profile';
import Shorts from './pages/Shorts';
import History from './pages/History';
import YourChannel from './pages/YourChannel';
import VideoUpload from './components/VideoUpload';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/shorts" element={<Shorts />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/history" element={<History />} />
            <Route path="/channel" element={<YourChannel />} />
            <Route path="/watch-later" element={<WatchLater />} />
            <Route path="/liked-videos" element={<LikedVideos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<VideoUpload />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
