import React, { useState, useEffect, useCallback } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// --- Whiteboard #1: Firm Overview ---
// This component is now "dumber". It only displays the data it is given.
const FirmOverview = ({ stats, loading }) => {
    if (loading || !stats) {
        return <div className="p-6 bg-[#0f1d34] rounded-xl"><h2 className="text-2xl font-semibold">Loading Firm Overview...</h2></div>;
    }

    const statCards = [
        { label: 'Total Users', value: stats.totalUsers },
        { label: 'Active Challenges', value: stats.activeChallenges },
        { label: 'Available Accounts', value: stats.availableStockAccounts, color: 'text-green-400' },
        { label: 'Assigned Accounts', value: stats.assignedStockAccounts, color: 'text-yellow-400' },
        { label: 'Passed Challenges', value: stats.passedChallenges },
    ];

    return (
        <div className="p-6 bg-[#0f1d34] rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Firm Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {statCards.map(stat => (
                    <div key={stat.label} className="bg-[#1e2f4a] p-4 rounded-lg text-center">
                        <p className={`text-3xl font-bold ${stat.color || 'text-white'}`}>{stat.value}</p>
                        <p className="text-sm text-gray-400">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- Whiteboard #2: Account Inventory ---
// This component is also simple. It displays the list the manager gives it,
// and it has a "red button" (onAccountAdded) to tell the manager when something changes.
const StockAccountManager = ({ stockAccounts, onAccountAdded, loading }) => {
    const [formData, setFormData] = useState({ mt5Login: '', mt5Password: '', mt5Server: 'Exness-Demo', accountSize: '10000' });
    const [message, setMessage] = useState('');

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
            setFormData({ mt5Login: '', mt5Password: '', mt5Server: 'Exness-Demo', accountSize: '10000' });
            onAccountAdded(); // Press the "red button" to notify the manager
        } else {
            setMessage(data.message || 'Error adding account.');
        }
    };

    return (
        <div className="p-6 bg-[#0f1d34] rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Manage Account Inventory</h2>
            {/* ... form is the same ... */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-6">
                <input type="text" name="mt5Login" value={formData.mt5Login} onChange={handleChange} placeholder="MT5 Login" required className="bg-[#1e2f4a] p-2 rounded w-full" />
                <input type="text" name="mt5Password" value={formData.mt5Password} onChange={handleChange} placeholder="MT5 Password" required className="bg-[#1e2f4a] p-2 rounded w-full" />
                <input type="number" name="accountSize" value={formData.accountSize} onChange={handleChange} placeholder="Account Size ($)" required className="bg-[#1e2f4a] p-2 rounded w-full" />
                <button type="submit" className="px-5 py-2 bg-blue-500 text-white font-bold rounded md:col-span-3 w-full">Verify & Add to Inventory</button>
            </form>
            {message && <p className="text-green-400 mb-4">{message}</p>}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                     <thead><tr className="border-b border-gray-600"><th className="p-2">MT5 Login</th><th className="p-2">Size</th><th className="p-2">Status</th><th className="p-2">Assigned To</th></tr></thead>
                    <tbody>
                        {loading ? <tr><td colSpan="4">Loading...</td></tr> : stockAccounts.map(acc => (
                            <tr key={acc._id} className="border-b border-gray-700 hover:bg-gray-800"><td className="p-2">{acc.mt5Login}</td><td className="p-2">${acc.accountSize.toLocaleString()}</td><td className={`p-2 capitalize font-semibold ${acc.status === 'available' ? 'text-green-400' : 'text-yellow-400'}`}>{acc.status}</td><td className="p-2">{acc.assignedToUser ? acc.assignedToUser.email : 'N/A'}</td></tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- The Main Admin Page (The "Office Manager") ---
const Admin = () => {
    const [stats, setStats] = useState(null);
    const [stockAccounts, setStockAccounts] = useState([]); // Manager now holds the inventory list
    const [loading, setLoading] = useState(true);

    // The manager's main job: get all the latest data for the entire office.
    const fetchAllData = useCallback(async () => {
        setLoading(true);
        try {
            // Get both stats and accounts at the same time
            const [statsRes, accountsRes] = await Promise.all([
                fetch(`${API_BASE}/api/admin/overview-stats`),
                fetch(`${API_BASE}/api/admin/stock-accounts`)
            ]);
            const statsData = await statsRes.json();
            const accountsData = await accountsRes.json();

            if (statsData.success) setStats(statsData.data);
            if (accountsData.success) setStockAccounts(accountsData.data);

        } catch (error) {
            console.error("Failed to fetch admin data");
        }
        setLoading(false);
    }, []);

    // The manager gets the data when the office first opens.
    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    return (
        <div className="min-h-screen bg-[#0a1526] text-white">
            <div className="container mx-auto px-4 py-8 space-y-8">
                <div>
                    <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                    <p className="text-gray-400 mt-1">Vornix Firm Overview & Management</p>
                </div>
                {/* The manager gives the "Firm Overview" worker the stats data */}
                <FirmOverview stats={stats} loading={loading} />
                
                {/* The manager gives the "Inventory" worker the inventory list AND the "red button" */}
                <StockAccountManager 
                    stockAccounts={stockAccounts} 
                    onAccountAdded={fetchAllData} 
                    loading={loading} 
                />
            </div>
        </div>
    );
};

export default Admin;
