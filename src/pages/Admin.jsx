import React, { useState } from 'react';

const Admin = () => {
  // State to hold the form data
  const [formData, setFormData] = useState({
    challengeType: 'Basic Challenge',
    accountSize: 600,
    price: 7,
    evaluationStages: 3,
    profitTargets: '10,8,5', // Comma-separated string for easy input
    dailyDrawdown: 5,
    maxDrawdown: 10,
    timeLimitDays: null,
    minTradingDays: 5,
    isNewsTradingAllowed: false,
    profitSplit: 85
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Prepare the data to send to the backend
    const payload = {
      ...formData,
      // Convert the comma-separated string of targets into an array of numbers
      profitTargets: formData.profitTargets.split(',').map(Number),
      // Make sure numbers are sent as numbers
      accountSize: Number(formData.accountSize),
      price: Number(formData.price),
      evaluationStages: Number(formData.evaluationStages),
      dailyDrawdown: Number(formData.dailyDrawdown),
      maxDrawdown: Number(formData.maxDrawdown),
      minTradingDays: Number(formData.minTradingDays),
      profitSplit: Number(formData.profitSplit),
      timeLimitDays: formData.timeLimitDays ? Number(formData.timeLimitDays) : null
    };

    try {
      const token = localStorage.getItem('token'); // We'll need this for security later
      const response = await fetch('/api/admin/challenges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}` // We will add this later
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`Successfully created challenge: ${data.data.challengeType} for $${data.data.accountSize}`);
        // Optionally, reset the form here
      } else {
        setError(data.message || 'Failed to create challenge.');
      }
    } catch (err) {
      setError('A network error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1526] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="text-gray-400 mt-2">Vornix Control Center</p>
        
        {/* Create Challenge Form */}
        <div className="mt-8 p-6 bg-[#0f1d34] rounded-xl border border-gray-700">
          <h2 className="text-2xl font-semibold mb-6">Create New Challenge Program</h2>

          {message && <div className="mb-4 p-3 rounded-lg bg-green-500/20 text-green-300">{message}</div>}
          {error && <div className="mb-4 p-3 rounded-lg bg-red-500/20 text-red-300">{error}</div>}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Form fields go here, one for each property in our Challenge model */}
            {/* A few examples are shown below */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Challenge Type</label>
              <input type="text" name="challengeType" value={formData.challengeType} onChange={handleChange} className="w-full bg-[#1e2f4a] border border-[#2a3e5c] rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Account Size ($)</label>
              <input type="number" name="accountSize" value={formData.accountSize} onChange={handleChange} className="w-full bg-[#1e2f4a] border border-[#2a3e5c] rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Price ($)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full bg-[#1e2f4a] border border-[#2a3e5c] rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Profit Targets (%, comma separated)</label>
              <input type="text" name="profitTargets" value={formData.profitTargets} onChange={handleChange} className="w-full bg-[#1e2f4a] border border-[#2a3e5c] rounded-lg p-2" placeholder="e.g., 10,8,5" />
            </div>
            {/* Add all other fields similarly */}
             <div className="col-span-full mt-4">
               <button type="submit" className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-lg shadow-lg">Create Challenge</button>
             </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
