import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Login from './pages/login';
import Signup from './pages/Signup';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <div className="h-screen flex flex-col">
              <Header />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <MainContent />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
