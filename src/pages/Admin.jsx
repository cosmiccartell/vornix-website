import React, { useState, useEffect } from 'react';

// This is the full address of your backend server, which we get from Vercel's settings.
const API_BASE = import.meta.env.VITE_API_BASE_URL;

// --- Section for Managing Challenge Blueprints ---
const ChallengeManager = () => {
    const [formData, setFormData] = useState({ challengeType: 'Basic', accountSize: 600, price: 7, evaluationStages: 3, profitTargets: '10,8,5', dailyDrawdown: 5, maxDrawdown: 10, timeLimitDays: '', minTradingDays: 5, isNewsTradingAllowed: false, profitSplit: 85 });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); setError('');
        const payload = { ...formData, profitTargets: formData.profitTargets.split(',').map(Number), timeLimitDays: formData.timeLimitDays ? Number(formData.timeLimitDays) : null };

        try {
            // THIS IS THE FIX: The fetch call now uses the full, correct backend address.
            const response = await fetch(`${API_BASE}/api/admin/challenges`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (data.success) {
                setMessage(`Success! Created: ${data.data.challengeType} for $${data.data.accountSize}`);
            } else {
                setError(data.message || 'Failed to create challenge.');
            }
        } catch (err) { setError('A network error occurred.'); }
    };
    
    return (
        <div className="mt-8 p-6 bg-[#0f1d34] rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6">Create New Challenge Blueprint</h2>
            {message && <div className="mb-4 p-3 rounded-lg bg-green-500/20 text-green-300">{message}</div>}
            {error && <div className="mb-4 p-3 rounded-lg bg-red-500/20 text-red-300">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Simplified form for brevity */}
                <input type="text" name="challengeType" value={formData.challengeType} onChange={handleChange} placeholder="Challenge Type (e.g., Standard)" className="w-full bg-[#1e2f4a] p-2 rounded-lg" />
                <input type="number" name="accountSize" value={formData.accountSize} onChange={handleChange} placeholder="Account Size ($)" className="w-full bg-[#1e2f4a] p-2 rounded-lg" />
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price ($)" className="w-full bg-[#1e2f4a] p-2 rounded-lg" />
                <button type="submit" className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg">Create Blueprint</button>
            </form>
        </div>
    );
};

// --- Section for Managing MT5 Account Inventory ---
const StockAccountManager = () => {
    const [formData, setFormData] = useState({ mt5Login: '', mt5Password: '', mt5Server: '', accountSize: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); setError('');
        const payload = { ...formData, accountSize: Number(formData.accountSize) };

        try {
            // THIS IS THE FIX: The fetch call now uses the full, correct backend address.
            const response = await fetch(`${API_BASE}/api/admin/stock-accounts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (data.success) {
                setMessage(`Success! Added MT5 Account: ${data.data.mt5Login} to inventory.`);
                setFormData({ mt5Login: '', mt5Password: '', mt5Server: '', accountSize: '' }); // Clear form
            } else {
                setError(data.message || 'Failed to add account.');
            }
        } catch (err) { setError('A network error occurred.'); }
    };

    return (
        <div className="mt-8 p-6 bg-[#0f1d34] rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6">Add MT5 Account to Inventory</h2>
            {message && <div className="mb-4 p-3 rounded-lg bg-green-500/20 text-green-300">{message}</div>}
            {error && <div className="mb-4 p-3 rounded-lg bg-red-500/20 text-red-300">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="mt5Login" value={formData.mt5Login} onChange={handleChange} placeholder="MT5 Login" required className="w-full bg-[#1e2f4a] p-2 rounded-lg" />
                <input type="text" name="mt5Password" value={formData.mt5Password} onChange={handleChange} placeholder="MT5 Password" required className="w-full bg-[#1e2f4a] p-2 rounded-lg" />
                <input type="text" name="mt5Server" value={formData.mt5Server} onChange={handleChange} placeholder="MT5 Server" required className="w-full bg-[#1e2f4a] p-2 rounded-lg" />
                <input type="number" name="accountSize" value={formData.accountSize} onChange={handleChange} placeholder="Account Size ($)" required className="w-full bg-[#1e2f4a] p-2 rounded-lg" />
                <button type="submit" className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg">Add to Inventory</button>
            </form>
        </div>
    );
};


// The main Admin Page that will show the two sections
const Admin = () => {
  return (
    <div className="min-h-screen bg-[#0a1526] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="text-gray-400 mt-2">Vornix Control Center</p>
        
        {/* We now show both manager components */}
        <StockAccountManager />
        <ChallengeManager />
      </div>
    </div>
  );
};

export default Admin;
