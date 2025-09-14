import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getToken } from '../utils/auth';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Checkout = () => {
    const { challengeId } = useParams();
    const [challenge, setChallenge] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [discountCode, setDiscountCode] = useState('');
    const [finalPrice, setFinalPrice] = useState(null);
    const [discountMessage, setDiscountMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChallengeDetails = async () => {
            if (!getToken()) {
                navigate('/login');
                return;
            }
            try {
                const response = await fetch(`${API_BASE}/api/public/challenges/${challengeId}`);
                const data = await response.json();
                if (data.success) {
                    setChallenge(data.data);
                    setFinalPrice(data.data.priceUpfront || data.data.price);
                } else { setError('Could not find the selected challenge.'); }
            } catch (err) { setError('An error occurred while fetching details.'); }
            setLoading(false);
        };
        fetchChallengeDetails();
    }, [challengeId, navigate]);

    const handleApplyDiscount = async () => {
        setIsProcessing(true);
        setDiscountMessage('');
        try {
            const response = await fetch(`${API_BASE}/api/payment/validate-discount`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
                body: JSON.stringify({ code: discountCode, challengeId })
            });
            const data = await response.json();
            if (data.success) {
                setFinalPrice(parseFloat(data.finalPrice));
                setDiscountMessage(data.message);
            } else { setDiscountMessage(data.message); }
        } catch (err) { setDiscountMessage('Network error applying code.'); }
        setIsProcessing(false);
    };

    const handleProceedToPayment = async () => {
        setIsProcessing(true);
        setError('');
        try {
            const response = await fetch(`${API_BASE}/api/payment/create-invoice`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
                body: JSON.stringify({ challengeId, discountCode })
            });
            const data = await response.json();
            if (data.success && data.redirectUrl) {
                // This is the magic! It sends the user to the payment page.
                window.location.href = data.redirectUrl;
            } else { setError(data.message || 'Could not proceed to payment.'); }
        } catch (err) { setError('Network error creating invoice.'); }
        setIsProcessing(false);
    };

    if (loading) { /* ... same loading spinner ... */ }
    if (error || !challenge) { /* ... same error display ... */ }

    return (
        <div className="min-h-screen bg-[#0a1526] text-white pt-24">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto bg-[#0f1d34] rounded-2xl p-8">
                    <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>
                    <div className="border-b border-gray-700 pb-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <div className="flex justify-between items-center text-lg">
                            <p className="text-gray-300">{challenge.challengeType} - ${challenge.accountSize.toLocaleString()}</p>
                            <p className="font-bold text-gray-400 line-through">${challenge.price.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="border-b border-gray-700 pb-6 mb-6">
                         <label className="block text-sm font-medium text-gray-300 mb-2">Discount Code</label>
                         <div className="flex gap-4">
                            <input type="text" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} placeholder="Enter code" className="flex-grow bg-[#1e2f4a] p-3 rounded-lg" disabled={isProcessing} />
                            <button onClick={handleApplyDiscount} className="px-5 py-2 bg-gray-600 rounded-lg" disabled={isProcessing}>Apply</button>
                         </div>
                         {discountMessage && <p className={`text-sm mt-2 ${discountMessage.includes('applied') ? 'text-green-400' : 'text-red-400'}`}>{discountMessage}</p>}
                    </div>
                    <div className="flex justify-between items-center text-2xl font-bold mb-8">
                        <p>Total Due Today</p>
                        <p className="text-yellow-400">${finalPrice.toLocaleString()}</p>
                    </div>
                    {error && <p className="text-red-400 text-center mb-4">{error}</p>}
                    <button onClick={handleProceedToPayment} className="w-full text-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-4 rounded-lg text-lg" disabled={isProcessing}>
                        {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
