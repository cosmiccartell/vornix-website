import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { setAuthData } from '../utils/auth';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const location = useLocation();
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const { email, password } = location.state || {};

  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  useEffect(() => {
    let timer;
    if (countdown > 0 && resendDisabled) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, resendDisabled]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    setResendDisabled(true);
    setCountdown(60);
    setMessage('');
    try {
      await authApi.sendOTP({ email });
      setMessage('New verification code has been sent to your email');
    } catch (err) {
      setMessage('Failed to resend OTP');
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setMessage('Please enter the 6-digit verification code');
      return;
    }
    
    setIsLoading(true);
    try {
      // Verify OTP and register
      const verifyResponse = await authApi.verifyOTP({ 
        email, 
        otp: otpCode, 
        password,
        name: email.split('@')[0] // Default name
      });
      
      if (verifyResponse.success) {
        // Automatically login after verification
        const loginResponse = await authApi.login({ 
          email, 
          password
        });
        
        if (loginResponse.success) {
          // Save token and user data
          setAuthData(loginResponse.token, loginResponse.user);
          navigate('/dashboard');
        } else {
          setMessage('Registration successful! Please login.');
          navigate('/login');
        }
      } else {
        setMessage(verifyResponse.message || 'Verification failed');
      }
    } catch (err) {
      setMessage('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1526] to-[#152a44] flex items-center justify-center p-4">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-md w-full border border-white/10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-yellow-400 mb-2">Verify Your Email</h2>
          <p className="text-gray-400">
            Enter the 6-digit code sent to <span className="text-yellow-400">{email}</span>
          </p>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-lg text-center ${
            message.includes('sent') 
              ? 'bg-green-500/20 text-green-300' 
              : 'bg-red-500/20 text-red-300'
          }`}>
            {message}
          </div>
        )}

        <div className="flex justify-center space-x-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-12 h-16 text-center text-3xl bg-white/5 border-2 border-white/10 rounded-lg focus:outline-none focus:border-yellow-500 text-white"
              disabled={isLoading}
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 mb-6"
        >
          {isLoading ? 'Verifying...' : 'Verify Account'}
        </button>

        <div className="text-center text-gray-400">
          <p>
            Didn't receive the code?{' '}
            <button
              onClick={handleResend}
              disabled={resendDisabled}
              className={`text-yellow-400 hover:text-yellow-300 ${
                resendDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Resend {resendDisabled && `(${countdown})`}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;