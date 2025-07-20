import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CountryScientists from './pages/CountryScientists';
import ScientistProfile from './pages/ScientistProfile';
import NewsList from './pages/NewsList';
import NewsArticle from './pages/NewsArticle';
import Favorites from './pages/Favorites';
import SpaceFacts from './pages/SpaceFacts';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:country" element={<CountryScientists />} />
          <Route path="/scientist/:id" element={<ScientistProfile />} />
          <Route path="/news" element={<NewsList />} />
          <Route path="/news/:id" element={<NewsArticle />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/space-facts" element={<SpaceFacts />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;