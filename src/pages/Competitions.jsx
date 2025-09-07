import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Competitions() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fixed countdown to June 10, 2024
  useEffect(() => {
    // Use ISO 8601 format for reliable date parsing
    const targetDate = new Date('2024-06-10T00:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance > 0) {
        setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
      } else {
        // Handle when countdown completes
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1a] to-[#0f1d34] text-white font-sans overflow-hidden">
      {/* Professional Background */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[url('https://assets.codepen.io/13471/grid-bg.svg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0f1a]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-6 py-2 bg-yellow-500/20 rounded-full mb-6 border border-yellow-500/30"
          >
            <span className="text-yellow-400 font-medium">June 10, 2024 Launch</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
              Professional Trading Championships
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-10"
          >
            Compete against the world's best traders for prestige, prizes, and institutional funding
          </motion.p>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="relative bg-gradient-to-br from-[#152743] to-[#0f1d34] border border-gray-700 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-left">
                  <div className="text-3xl font-bold text-yellow-400 mb-3">Coming Soon</div>
                  <p className="text-gray-300 mb-4 max-w-md">
                    We're finalizing competition details including prize structures, rules, and categories.
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold">June 10, 2024</div>
                      <div className="text-gray-400 text-sm">Official Launch Date</div>
                    </div>
                  </div>
                </div>
                
                {/* Countdown Timer */}
                <div className="grid grid-cols-4 gap-2 min-w-[300px]">
                  <div className="bg-gradient-to-r from-[#1d2f4d] to-[#0f1d34] p-4 rounded-xl border border-gray-700 shadow-lg">
                    <div className="text-3xl font-bold text-yellow-400">
                      {days.toString().padStart(2, '0')}
                    </div>
                    <div className="text-gray-400 text-sm">Days</div>
                  </div>
                  <div className="bg-gradient-to-r from-[#1d2f4d] to-[#0f1d34] p-4 rounded-xl border border-gray-700 shadow-lg">
                    <div className="text-3xl font-bold text-yellow-400">
                      {hours.toString().padStart(2, '0')}
                    </div>
                    <div className="text-gray-400 text-sm">Hours</div>
                  </div>
                  <div className="bg-gradient-to-r from-[#1d2f4d] to-[#0f1d34] p-4 rounded-xl border border-gray-700 shadow-lg">
                    <div className="text-3xl font-bold text-yellow-400">
                      {minutes.toString().padStart(2, '0')}
                    </div>
                    <div className="text-gray-400 text-sm">Minutes</div>
                  </div>
                  <div className="bg-gradient-to-r from-[#1d2f4d] to-[#0f1d34] p-4 rounded-xl border border-gray-700 shadow-lg">
                    <div className="text-3xl font-bold text-yellow-400">
                      {seconds.toString().padStart(2, '0')}
                    </div>
                    <div className="text-gray-400 text-sm">Seconds</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 pt-8 border-t border-gray-800">
                <p className="text-gray-300 mb-8 max-w-xl mx-auto text-center">
                  Join our exclusive notification list to be the first to know when competitions open
                </p>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-500/20 border border-green-500/30 py-4 px-6 rounded-lg text-green-400 text-center"
                  >
                    Thank you! We'll notify you when competitions launch.
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your professional email"
                        className="flex-1 px-4 py-3 bg-[#0f1d34] rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                      <button 
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold rounded-lg shadow-lg transition-all"
                      >
                        Get Notified
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-800 pt-12 mt-20">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-bold mb-4 text-yellow-400">Vornix Championships</h3>
              <p className="text-gray-400 text-sm">
                Elevating trading excellence through competitive innovation
              </p>
            </div>
            
            <div>
              <h4 className="text-gray-400 font-semibold mb-4">Competitions</h4>
              <ul className="space-y-2">
                {['Forex Masters', 'Crypto Challenge', 'Equity Elite', 'Commodities'].map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-300 hover:text-yellow-400 transition">
                    <a href="#">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-gray-400 font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                {['Competition Rules', 'Scoring System', 'Preparation Guides', 'FAQ'].map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-300 hover:text-yellow-400 transition">
                    <a href="#">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-gray-400 font-semibold mb-4">Contact</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <p>competitions@vornix.com</p>
                <p>+1 (555) 123-4567</p>
                <p>24/7 Support</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-500">
              Â© {new Date().getFullYear()} Vornix Funding. All rights reserved.
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Trading involves risk. Past performance is not indicative of future results.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
