import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Challenge = lazy(() => import('./pages/Challenge'));
const About = lazy(() => import('./pages/About'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Competitions = lazy(() => import('./pages/Competitions'));
const Promotions = lazy(() => import('./pages/Promotions'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const VerifyOTP = lazy(() => import('./pages/VerifyOTP'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword')); // Add this line
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

// Loading spinner component
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
        <Suspense fallback={<Loading />}>
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
            <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Add this route */}
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            <Route path="/faq" element={<FAQ />} />

            {/* 404 Fallback */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center bg-[#0a1526] text-white">
                <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
              </div>
            } />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;