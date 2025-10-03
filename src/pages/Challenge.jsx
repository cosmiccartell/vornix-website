import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// --- New Component: Skeleton Card ---
// This is the placeholder that appears while data is loading
const ChallengeSkeleton = () => (
    <div className="bg-[#0f1d34] rounded-2xl border border-gray-700 p-6 flex flex-col justify-between h-80 animate-pulse">
        <div>
            {/* Type & Size */}
            <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
            <div className="h-8 bg-gray-600 rounded w-2/3 mt-1 mb-6"></div>
            
            {/* List Items */}
            <div className="space-y-3">
                <div className="h-3 bg-gray-700 rounded w-full"></div>
                <div className="h-3 bg-gray-700 rounded w-5/6"></div>
                <div className="h-3 bg-gray-700 rounded w-full"></div>
            </div>
        </div>
        <div className="mt-6">
            {/* Price & Button */}
            <div className="h-8 bg-gray-600 rounded w-1/2 mb-4"></div>
            <div className="h-10 bg-gray-700 rounded w-full"></div>
        </div>
    </div>
);
// ------------------------------------

const Challenges = () => {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Basic');

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/public/challenges`);
                const data = await response.json();
                if (data.success) {
                    setChallenges(data.data);
                    // Determine the initial active tab based on the fetched data
                    if (data.data.length > 0) {
                        const firstType = data.data[0].challengeType;
                        setActiveTab(firstType);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch challenges:", error);
            }
            setLoading(false);
        };
        fetchChallenges();
    }, []);

    // Grouping logic is excellent and remains memoized
    const groupedChallenges = useMemo(() => {
        return challenges.reduce((acc, challenge) => {
            const type = challenge.challengeType;
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(challenge);
            return acc;
        }, {});
    }, [challenges]);

    const challengeTypes = Object.keys(groupedChallenges);

    // --- Loading State uses the new Skeleton Component ---
    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a1526] text-white">
                <div className="container mx-auto px-4 py-24">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold mb-4">Our Challenges</h1>
                        <p className="text-xl text-gray-400">Loading your trading paths...</p>
                    </div>
                    {/* Placeholder for Tabs */}
                    <div className="flex justify-center mb-12">
                        <div className="inline-flex bg-gray-900 rounded-xl p-1 border border-gray-700 w-96 h-12 animate-pulse"></div>
                    </div>
                    {/* Grid of Skeleton Cards (using 4 for a good visual) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <ChallengeSkeleton />
                        <ChallengeSkeleton />
                        <ChallengeSkeleton />
                        <ChallengeSkeleton />
                    </div>
                </div>
            </div>
        );
    }
    // ---------------------------------------------------

    // Fallback if there are no challenges after loading
    if (challengeTypes.length === 0) {
        return (
             <div className="min-h-screen flex items-center justify-center bg-[#0a1526] text-white">
                <p className="text-xl text-gray-400">No challenges available at the moment.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a1526] text-white">
            <div className="container mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-4">Our Challenges</h1>
                    <p className="text-xl text-gray-400">Choose the path that best fits your trading style.</p>
                </div>

                {/* Dynamic Tabs for each Challenge Type */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-gray-900 rounded-xl p-1 border border-gray-700">
                        {challengeTypes.map(type => (
                            <button
                                key={type}
                                onClick={() => setActiveTab(type)}
                                className={`px-6 py-3 rounded-lg transition-all font-semibold ${activeTab === type ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:bg-gray-800'}`}
                            >
                                {type} Challenge
                            </button>
                        ))}
                    </div>
                </div>

                {/* Dynamic Grid of Accounts for the selected Challenge Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {groupedChallenges[activeTab]?.map(challenge => (
                        <div key={challenge._id} className="bg-[#0f1d34] rounded-2xl border border-gray-700 p-6 flex flex-col justify-between hover:border-yellow-500 transition-all hover:scale-105">
                            <div>
                                <p className="text-sm font-bold text-yellow-400">{challenge.challengeType}</p>
                                <h3 className="text-3xl font-bold mt-1">${challenge.accountSize.toLocaleString()}</h3>
                                <ul className="text-sm text-gray-300 mt-4 space-y-2">
                                    <li><strong>Profit Target:</strong> {challenge.profitTargets.join('% / ')}%</li>
                                    <li><strong>Max Drawdown:</strong> {challenge.maxDrawdown}%</li>
                                    <li><strong>News Trading:</strong> {challenge.isNewsTradingAllowed ? '✅ Allowed' : '❌ Restricted'}</li>
                                </ul>
                            </div>
                            <div className="mt-6">
                                <p className="text-4xl font-bold mb-4">${challenge.priceUpfront || challenge.price}</p>
                                <Link to={`/checkout/${challenge._id}`} className="block w-full text-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-3 rounded-lg">
                                    Get Challenge
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Challenges;
