import React, { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// --- Component for Firm Overview ---
const FirmOverview = () => {
    // In the future, this data will come from the backend. For now, it's a placeholder.
    const stats = {
        totalUsers: 1, // You are the first user!
        activeChallenges: 0,
        passedChallenges: 0,
        failedChallenges: 0,
        totalRevenue: '$0'
    };

    return (
        <div className="p-6 bg-[#0f1d34] rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Firm Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(stats).map(([key, value]) => (
                    <div key={key} className="bg-[#1e2f4a] p-4 rounded-lg text-center">
                        <p className="text-3xl font-bold text-yellow-400">{value}</p>
                        <p className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- Component for Managing MT5 Account Inventory ---
const StockAccountManager = () => {
    const [formData, setFormData] = useState({ mt5Login: '', mt5Password: '', mt5Server: 'Exness-Demo', accountSize: '10000' });
    const [stockAccounts, setStockAccounts] = useState([]);
    const [message, setMessage] = useState('');
    
    // Function to fetch accounts, which we can call anytime
    const fetchStockAccounts = async () => {
        try {
            const response = await fetch(`${API_BASE}/api/admin/stock-accounts`);
            const data = await response.json();
            if (data.success) setStockAccounts(data.data);
        } catch (error) { console.error("Failed to fetch stock accounts"); }
    };
    
    useEffect(() => { fetchStockAccounts(); }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        const response = await fetch(`${API_BASE}/api/admin/stock-accounts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, accountSize: Number(formData.accountSize) })
        });
        const data = await response.json();
        if (data.success) {
            setMessage(`Added MT5 Account: ${data.data.mt5Login}`);
            fetchStockAccounts(); // Re-fetch the list to show the new account
            setFormData({ mt5Login: '', mt5Password: '', mt5Server: 'Exness-Demo', accountSize: '10000' });
        } else {
            setMessage(data.message || 'Error adding account.');
        }
    };

    return (
        <div className="p-6 bg-[#0f1d34] rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Manage Account Inventory</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-6">
                <input type="text" name="mt5Login" value={formData.mt5Login} onChange={handleChange} placeholder="MT5 Login" required className="bg-[#1e2f4a] p-2 rounded w-full" />
                <input type="text" name="mt5Password" value={formData.mt5Password} onChange={handleChange} placeholder="MT5 Password" required className="bg-[#1e2f4a] p-2 rounded w-full" />
                <input type="number" name="accountSize" value={formData.accountSize} onChange={handleChange} placeholder="Account Size ($)" required className="bg-[#1e2f4a] p-2 rounded w-full" />
                <button type="submit" className="px-5 py-2 bg-blue-500 text-white font-bold rounded md:col-span-3 w-full">Add to Inventory</button>
            </form>
            {message && <p className="text-green-400 mb-4">{message}</p>}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead><tr className="border-b border-gray-600"><th className="p-2">MT5 Login</th><th className="p-2">Size</th><th className="p-2">Status</th></tr></thead>
                    <tbody>
                        {stockAccounts.map(acc => ( <tr key={acc._id} className="border-b border-gray-700 hover:bg-gray-800"><td className="p-2">{acc.mt5Login}</td><td className="p-2">${acc.accountSize.toLocaleString()}</td><td className="p-2 capitalize text-green-400">{acc.status}</td></tr> ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- Component for Managing Discount Codes ---
const DiscountCodeManager = () => {
    // We will build this component in the next step, once the foundation is solid.
    return (
         <div className="p-6 bg-[#0f1d34] rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Manage Discount Codes (Coming Soon)</h2>
            <p className="text-gray-400">This section will allow you to create and manage discount codes for your challenges.</p>
        </div>
    );
}

// --- Main Admin Page ---
const Admin = () => {
  return (
    <div className="min-h-screen bg-[#0a1526] text-white">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400 mt-1">Vornix Firm Overview & Management</p>
        </div>
        <FirmOverview />
        <StockAccountManager />
        <DiscountCodeManager />
      </div>
    </div>
  );
};

export default Admin;
