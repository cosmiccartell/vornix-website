import React, { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// --- Component for Managing MT5 Account Inventory ---
const StockAccountManager = () => {
    const [formData, setFormData] = useState({ mt5Login: '', mt5Password: '', mt5Server: '', accountSize: '' });
    const [stockAccounts, setStockAccounts] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Load the current inventory when the page loads
        const fetchStockAccounts = async () => {
            const response = await fetch(`${API_BASE}/api/admin/stock-accounts`);
            const data = await response.json();
            if (data.success) setStockAccounts(data.data);
        };
        fetchStockAccounts();
    }, []);

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
            setStockAccounts(prev => [...prev, data.data]); // Add to the list in real-time
            setFormData({ mt5Login: '', mt5Password: '', mt5Server: '', accountSize: '' });
        } else {
            setMessage(data.message || 'Error adding account.');
        }
    };

    return (
        <div className="p-6 bg-[#0f1d34] rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Manage Account Inventory</h2>
            {/* Form to add new accounts */}
            <form onSubmit={handleSubmit} className="space-y-3 mb-6">
                <input type="text" name="mt5Login" value={formData.mt5Login} onChange={handleChange} placeholder="MT5 Login" required className="w-full bg-[#1e2f4a] p-2 rounded" />
                {/* ... other inputs ... */}
                 <button type="submit" className="px-5 py-2 bg-blue-500 text-white font-bold rounded">Add to Inventory</button>
            </form>
             {message && <p className="text-green-400 mb-4">{message}</p>}
            {/* Table to display current inventory */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-600">
                            <th className="p-2">MT5 Login</th>
                            <th className="p-2">Size</th>
                            <th className="p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockAccounts.map(acc => (
                            <tr key={acc._id} className="border-b border-gray-700">
                                <td className="p-2">{acc.mt5Login}</td>
                                <td className="p-2">${acc.accountSize.toLocaleString()}</td>
                                <td className="p-2 capitalize">{acc.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- Main Admin Page ---
const Admin = () => {
  return (
    <div className="min-h-screen bg-[#0a1526] text-white">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400 mt-1">Vornix Firm Overview & Management</p>
        </div>
        {/* We will add the Stats/Overview component here in the next step */}
        
        <StockAccountManager />
        {/* We will add the Discount Code component here in the next step */}
      </div>
    </div>
  );
};

export default Admin;
