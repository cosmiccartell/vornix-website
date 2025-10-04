import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary'; // <--- Ensure this path is correct

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
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      {/* The ErrorBoundary must wrap the structure that can crash. 
        Wrapping this low ensures Navbar failure is caught, too. 
      */}
      <ErrorBoundary> 
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
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
            <Route path="/checkout/:challengeId" element={<Checkout />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center bg-[#0a1526] text-white">
                <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
              </div>
            } />
          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
