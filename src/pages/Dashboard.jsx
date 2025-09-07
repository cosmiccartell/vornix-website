import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import { getToken, getUser, clearAuthData } from '../utils/auth';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, you would fetch user data from an API
        const userData = getUser();
        
        if (!userData || !getToken()) {
          navigate('/login');
          return;
        }
        
        setUser(userData);
        
        // Mock challenges data
        setChallenges([
          {
            id: 1,
            accountType: 'Standard',
            status: 'active',
            balance: 10000,
            startDate: new Date(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            progress: 75
          },
          {
            id: 2,
            accountType: 'Premium',
            status: 'completed',
            balance: 25000,
            startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
            progress: 100
          }
        ]);
      } catch (error) {
        console.error('Dashboard error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    clearAuthData();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a1526] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1526] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-400 mt-2">
              Welcome back, {user?.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 md:mt-0 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#0f1d34] rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Account Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Account Status:</span>
                <span className="text-green-400 font-medium">Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Joined Date:</span>
                <span>June 3, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Active Challenges:</span>
                <span>1</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0f1d34] rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-[#152743] hover:bg-[#1a3150] p-4 rounded-lg transition flex flex-col items-center">
                <div className="bg-yellow-500/20 p-3 rounded-full mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <span>Start New Challenge</span>
              </button>
              <button className="bg-[#152743] hover:bg-[#1a3150] p-4 rounded-lg transition flex flex-col items-center">
                <div className="bg-blue-500/20 p-3 rounded-full mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span>View Reports</span>
              </button>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Your Challenges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map(challenge => (
            <DashboardCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
