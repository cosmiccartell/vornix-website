import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// --- SPEED UPGRADE: We now load all pages at once for instant navigation ---
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Challenge from './pages/Challenge';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Competitions from './pages/Competitions';
import Promotions from './pages/Promotions';
import Register from './pages/Register';
import Login from './pages/Login';
import VerifyOTP from './pages/VerifyOTP';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Loading component is no longer needed between pages, but we keep it for other potential uses
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#0a1526]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
  </div>
);

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16">
        {/* --- SPEED UPGRADE: The <Suspense> wrapper is no longer needed here --- */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/challenges" element={<Challenge />} />
          <Route path="/about" element={<About />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-[#0a1526] text-white">
              <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
