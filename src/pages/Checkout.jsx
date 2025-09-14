import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Checkout = () => {
    const { challengeId } = useParams();
    const [challenge, setChallenge] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchChallengeDetails = async () => {
            if (!challengeId) return;
            try {
                const response = await fetch(`${API_BASE}/api/public/challenges/${challengeId}`);
                const data = await response.json();
                if (data.success) {
                    setChallenge(data.data);
                } else {
                    setError('Could not find the selected challenge.');
                }
            } catch (err) {
                setError('An error occurred while fetching challenge details.');
            }
            setLoading(false);
        };
        fetchChallengeDetails();
    }, [challengeId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a1526]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            </div>
        );
    }

    if (error || !challenge) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a1526] text-white">
                <h1 className="text-3xl font-bold text-red-500 mb-4">Error</h1>
                <p>{error || 'Challenge data could not be loaded.'}</p>
                <Link to="/challenges" className="mt-6 px-6 py-2 bg-yellow-500 text-black font-bold rounded-lg">
                    Back to Challenges
                </Link>
            </div>
        );
    }
    
    const finalPrice = challenge.priceUpfront || challenge.price;

    return (
        <div className="min-h-screen bg-[#0a1526] text-white pt-24">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto bg-[#0f1d34] rounded-2xl border border-gray-700 p-8">
                    <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>
                    <div className="border-b border-gray-700 pb-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <div className="flex justify-between items-center text-lg">
                            <p className="text-gray-300">{challenge.challengeType} - ${challenge.accountSize.toLocaleString()}</p>
                            <p className="font-bold">${challenge.price.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="border-b border-gray-700 pb-6 mb-6">
                         <label className="block text-sm font-medium text-gray-300 mb-2">Discount Code</label>
                         <div className="flex gap-4">
                            <input type="text" placeholder="Enter code" className="flex-grow bg-[#1e2f4a] p-3 rounded-lg" />
                            <button className="px-5 py-2 bg-gray-600 rounded-lg">Apply</button>
                         </div>
                    </div>
                    <div className="flex justify-between items-center text-2xl font-bold mb-8">
                        <p>Total Due Today</p>
                        <p className="text-yellow-400">${finalPrice.toLocaleString()}</p>
                    </div>
                    <button className="w-full text-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-4 rounded-lg text-lg">
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
