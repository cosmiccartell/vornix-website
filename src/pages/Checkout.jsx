// src/pages/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getToken } from '../utils/auth';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

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
    let mounted = true;
    const fetchChallengeDetails = async () => {
      try {
        const token = getToken();
        if (!token) {
          // user not logged in; redirect to login (you may change to show login inline)
          navigate('/login');
          return;
        }

        // fetch challenge details
        const resp = await fetch(`${API_BASE}/api/public/challenges/${challengeId}`);
        if (!resp.ok) {
          // handle non-2xx
          const text = await resp.text().catch(() => '');
          throw new Error(`Failed to fetch challenge: ${resp.status} ${text}`);
        }
        const data = await resp.json().catch(() => null);
        if (!data || !data.success) {
          setError(data?.message || 'Could not find the selected challenge.');
          return;
        }

        if (mounted) {
          setChallenge(data.data || null);
          const price = data.data?.priceUpfront ?? data.data?.price ?? null;
          setFinalPrice(price !== null ? Number(price) : null);
        }
      } catch (err) {
        console.error('fetchChallengeDetails error:', err);
        setError('An error occurred while fetching details.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (challengeId) fetchChallengeDetails();
    else setLoading(false);

    return () => {
      mounted = false;
    };
  }, [challengeId, navigate]);

  const handleApplyDiscount = async () => {
    setIsProcessing(true);
    setDiscountMessage('');
    try {
      const token = getToken();
      if (!token) {
        setDiscountMessage('You must be logged in to apply discount.');
        setIsProcessing(false);
        return;
      }
      const resp = await fetch(`${API_BASE}/api/payment/validate-discount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ code: discountCode, challengeId })
      });
      const data = await resp.json().catch(() => null);
      if (data && data.success) {
        const fp = Number(data.finalPrice ?? data.final_price ?? data.price ?? finalPrice);
        setFinalPrice(Number.isFinite(fp) ? fp : finalPrice);
        setDiscountMessage(data.message || 'Discount applied.');
      } else {
        setDiscountMessage(data?.message || 'Invalid discount code.');
      }
    } catch (err) {
      console.error('applyDiscount error:', err);
      setDiscountMessage('Network error applying code.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProceedToPayment = async () => {
    setIsProcessing(true);
    setError('');
    try {
      const token = getToken();
      if (!token) {
        setError('You must be logged in to proceed.');
        setIsProcessing(false);
        return;
      }
      const resp = await fetch(`${API_BASE}/api/payment/create-invoice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ challengeId, discountCode })
      });
      const data = await resp.json().catch(() => null);
      if (data && data.success && data.redirectUrl) {
        // redirect to payment provider
        window.location.href = data.redirectUrl;
        return;
      }
      setError(data?.message || 'Could not proceed to payment.');
    } catch (err) {
      console.error('create-invoice error:', err);
      setError('Network error creating invoice.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a1526]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  // Error or no challenge
  if (error || !challenge) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a1526] text-white p-6">
        <div className="max-w-xl text-center bg-[#0f1d34] rounded-2xl p-8 border border-gray-700">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Error</h1>
          <p className="mb-4">{error || 'Challenge data could not be loaded.'}</p>
          <div className="flex justify-center gap-4">
            <Link to="/challenges" className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg">Back to Challenges</Link>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Rendered checkout
  const safeAccountSize = challenge.accountSize ?? 0;
  const displayAccountSize = typeof safeAccountSize === 'number' ? safeAccountSize.toLocaleString() : String(safeAccountSize);

  return (
    <div className="min-h-screen bg-[#0a1526] text-white pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-[#0f1d34] rounded-2xl p-8 border border-gray-700">
          <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>

          <div className="border-b border-gray-700 pb-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between items-center text-lg">
              <p className="text-gray-300">
                {String(challenge.challengeType ?? 'Challenge')} - ${displayAccountSize}
              </p>
              <p className="font-bold text-gray-400 line-through">
                ${Number(challenge.price ?? 0).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="border-b border-gray-700 pb-6 mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Discount Code</label>
            <div className="flex gap-4">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Enter code"
                className="flex-grow bg-[#1e2f4a] p-3 rounded-lg"
                disabled={isProcessing}
              />
              <button
                onClick={handleApplyDiscount}
                className="px-5 py-2 bg-gray-600 rounded-lg"
                disabled={isProcessing}
              >
                {isProcessing ? 'Applying...' : 'Apply'}
              </button>
            </div>
            {discountMessage && (
              <p className={`text-sm mt-2 ${discountMessage.toLowerCase().includes('applied') ? 'text-green-400' : 'text-red-400'}`}>
                {discountMessage}
              </p>
            )}
          </div>

          <div className="flex justify-between items-center text-2xl font-bold mb-8">
            <p>Total Due Today</p>
            <p className="text-yellow-400">
              ${Number.isFinite(Number(finalPrice)) ? Number(finalPrice).toLocaleString() : '0'}
            </p>
          </div>

          {error && <p className="text-red-400 text-center mb-4">{error}</p>}

          <button
            onClick={handleProceedToPayment}
            className="w-full text-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-4 rounded-lg text-lg"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
