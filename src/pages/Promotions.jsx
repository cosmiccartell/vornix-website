import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Promotions() {
  const [activeTab, setActiveTab] = useState('how-it-works');
  const [referralCode, setReferralCode] = useState('VORNIX-REF-2024');
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1a] to-[#0f1d34] text-white font-sans overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c1a2b] via-[#0f1d34] to-[#152743]"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-medium"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-6 py-2 bg-yellow-500/20 rounded-full mb-6 border border-yellow-500/30"
          >
            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-yellow-400 font-medium">Limited Time Offer</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
              Earn Free Trading Accounts
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-10"
          >
            Refer friends to Vornix and unlock premium trading accounts at no cost
          </motion.p>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative max-w-3xl mx-auto bg-[#152743]/80 backdrop-blur-md border-2 border-yellow-500/30 rounded-2xl p-8"
          >
            <div className="text-3xl font-bold text-yellow-400 mb-6">Your Referral Program</div>
            
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="bg-gradient-to-br from-[#1d2f4d] to-[#0f1d34] p-6 rounded-xl border border-gray-700 shadow-lg flex-1 transform transition-all hover:-translate-y-1">
                <div className="text-4xl font-bold text-yellow-400 mb-2">10</div>
                <div className="text-xl font-medium">Referrals</div>
                <div className="text-gray-400 mt-2">Earns a free $2000 challenge account</div>
              </div>
              
              <div className="bg-gradient-to-br from-[#1d2f4d] to-[#0f1d34] p-6 rounded-xl border border-gray-700 shadow-lg flex-1 transform transition-all hover:-translate-y-1">
                <div className="text-4xl font-bold text-yellow-400 mb-2">20</div>
                <div className="text-xl font-medium">Referrals</div>
                <div className="text-gray-400 mt-2">Earns a free $5000 challenge + $10 bonus</div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Earn unlimited rewards - every 10 referrals gets you another $2000 account, 
              every 20 gets a $5000 account with $10 bonus!
            </p>
          </motion.div>
        </div>

        {/* Program Details */}
        <div className="py-16 bg-[#0a1526]/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6">
            {/* Tabs */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex bg-gray-900 rounded-xl p-1 border border-gray-700 shadow-lg">
                <button
                  onClick={() => setActiveTab('how-it-works')}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    activeTab === 'how-it-works' 
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  How It Works
                </button>
                <button
                  onClick={() => setActiveTab('rewards')}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    activeTab === 'rewards' 
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  Reward Tiers
                </button>
                <button
                  onClick={() => setActiveTab('get-started')}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    activeTab === 'get-started' 
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="bg-[#152743]/80 backdrop-blur-md rounded-xl border border-gray-700 p-8">
              {activeTab === 'how-it-works' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  <h2 className="text-3xl font-bold mb-6 text-yellow-400">How Our Referral Program Works</h2>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      {
                        step: "1",
                        title: "Get Your Referral Link",
                        description: "Use your unique referral code or link to share with your network",
                        icon: "🔗"
                      },
                      {
                        step: "2",
                        title: "Share on Social Media",
                        description: "Post on Telegram, Instagram, Facebook, or any platform",
                        icon: "📱"
                      },
                      {
                        step: "3",
                        title: "Track Your Referrals",
                        description: "Monitor your referrals in real-time through your dashboard",
                        icon: "📊"
                      },
                      {
                        step: "4",
                        title: "Earn Rewards Automatically",
                        description: "Get notified when you qualify for free challenges",
                        icon: "🎁"
                      },
                      {
                        step: "5",
                        title: "Redeem Your Accounts",
                        description: "Access your free challenges immediately after qualification",
                        icon: "💳"
                      },
                      {
                        step: "6",
                        title: "Repeat & Earn More",
                        description: "Continue referring to earn unlimited rewards",
                        icon: "🔄"
                      }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-[#0f1d34] p-6 rounded-xl border border-gray-700 transform transition-all hover:-translate-y-1 hover:shadow-lg"
                      >
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mr-4">
                            <span className="text-2xl">{item.icon}</span>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                            <span className="text-sm font-bold text-yellow-400">{item.step}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-300">{item.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'rewards' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h2 className="text-3xl font-bold mb-6 text-yellow-400">Referral Reward Tiers</h2>
                  
                  <div className="overflow-x-auto rounded-xl border border-gray-700">
                    <table className="w-full bg-[#0f1d34]">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="p-4 text-left bg-gray-800/50">Referrals</th>
                          <th className="p-4 text-left bg-gray-800/50">Reward</th>
                          <th className="p-4 text-left bg-gray-800/50">Bonus</th>
                          <th className="p-4 text-left bg-gray-800/50">Repeatable</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-700 hover:bg-[#1d2f4d] transition-colors">
                          <td className="p-4 font-bold">10 People</td>
                          <td className="p-4 text-yellow-400">Free $2000 Challenge Account</td>
                          <td className="p-4">-</td>
                          <td className="p-4 text-green-400">✓ Yes, every 10 referrals</td>
                        </tr>
                        <tr className="border-b border-gray-700 hover:bg-[#1d2f4d] transition-colors">
                          <td className="p-4 font-bold">20 People</td>
                          <td className="p-4 text-yellow-400">Free $5000 Challenge Account</td>
                          <td className="p-4">$10 cash bonus after passing challenge</td>
                          <td className="p-4 text-green-400">✓ Yes, every 20 referrals</td>
                        </tr>
                        <tr className="hover:bg-[#1d2f4d] transition-colors">
                          <td className="p-4 font-bold">50+ People</td>
                          <td className="p-4 text-yellow-400">Custom Rewards Package</td>
                          <td className="p-4">Higher bonuses & exclusive benefits</td>
                          <td className="p-4">Contact us for details</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-8 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                    <h3 className="text-xl font-bold mb-3 text-yellow-400">Important Notes</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Referrals must be genuine users who sign up through your link</li>
                      <li>• Rewards are granted automatically when you reach each milestone</li>
                      <li>• There is no limit to how many times you can earn rewards</li>
                      <li>• $10 bonus is paid after you pass the $5000 challenge</li>
                    </ul>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'get-started' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="max-w-3xl mx-auto"
                >
                  <h2 className="text-3xl font-bold mb-6 text-yellow-400">Start Earning Today</h2>
                  
                  <div className="bg-[#0f1d34] p-8 rounded-xl border border-gray-700 mb-8">
                    <h3 className="text-xl font-bold mb-4">Your Unique Referral Code</h3>
                    <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                      <div className="flex-1 bg-[#152743] p-4 rounded-lg border border-gray-700 text-lg font-mono">
                        {referralCode}
                      </div>
                      <button 
                        onClick={copyToClipboard}
                        className="px-6 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5"
                      >
                        {copied ? 'Copied!' : 'Copy Code'}
                      </button>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4">Your Referral Link</h3>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <div className="flex-1 bg-[#152743] p-4 rounded-lg border border-gray-700 text-sm md:text-base truncate">
                        https://vornix.com/join?ref={referralCode}
                      </div>
                      <button 
                        onClick={copyToClipboard}
                        className="px-6 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5"
                      >
                        {copied ? 'Copied!' : 'Copy Link'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-[#0f1d34] p-6 rounded-xl border border-gray-700 transform transition-all hover:-translate-y-1">
                      <h3 className="text-xl font-bold mb-4">Share Directly</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {['Telegram', 'Instagram', 'Facebook', 'Twitter'].map((platform, idx) => (
                          <button 
                            key={idx}
                            className="py-3 bg-[#152743] rounded-lg border border-gray-700 hover:border-yellow-500 transition-colors flex items-center justify-center"
                          >
                            {platform}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-[#0f1d34] p-6 rounded-xl border border-gray-700 transform transition-all hover:-translate-y-1">
                      <h3 className="text-xl font-bold mb-4">Track Your Progress</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span>Your Referrals</span>
                            <span className="text-yellow-400">0/10</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-yellow-500 h-2.5 rounded-full transition-all duration-500" style={{ width: '0%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span>Next Reward</span>
                            <span className="text-yellow-400">$2000 Challenge</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-yellow-500 h-2.5 rounded-full transition-all duration-500" style={{ width: '0%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="py-20 bg-[#0a1526]/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Referral Program FAQ</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  q: "Who can participate in the referral program?",
                  a: "All registered Vornix traders can participate. There's no minimum account requirement."
                },
                {
                  q: "What counts as a successful referral?",
                  a: "A referral must sign up using your unique link and verify their account to count."
                },
                {
                  q: "How quickly do I receive my rewards?",
                  a: "Rewards are granted within 24 hours of reaching each milestone."
                },
                {
                  q: "Can I earn multiple rewards?",
                  a: "Yes! There's no limit. Every 10 referrals earns a $2000 account, every 20 earns a $5000 account + bonus."
                },
                {
                  q: "When do I receive the $10 bonus?",
                  a: "The $10 bonus is paid after you pass the $5000 challenge account you earned."
                },
                {
                  q: "Where can I share my referral link?",
                  a: "You can share on any platform - Telegram, Instagram, Facebook, Twitter, or any social media."
                }
              ].map((faq, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#152743]/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-colors"
                >
                  <h3 className="text-lg font-bold mb-3">{faq.q}</h3>
                  <p className="text-gray-300">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-1 rounded-2xl inline-block"
            >
              <div className="bg-[#0a0f1a] px-8 py-12 rounded-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Earn Free Trading Accounts?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto">
                  Start sharing your referral link and unlock premium challenges today
                </p>
                <button className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                  Get Your Referral Link
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-12 bg-[#0a0f1a]/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <h3 className="text-lg font-bold mb-4 text-yellow-400">Vornix</h3>
                <p className="text-gray-400 text-sm">
                  India's First Proprietary Trading Firm
                </p>
              </div>
              
              <div>
                <h4 className="text-gray-400 font-semibold mb-4">Programs</h4>
                <ul className="space-y-2">
                  {['Evaluation Challenges', 'Funded Accounts', 'Referral Program'].map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-300 hover:text-yellow-400 transition">
                      <a href="#">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-gray-400 font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  {['Terms of Service', 'Privacy Policy', 'Risk Disclosure'].map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-300 hover:text-yellow-400 transition">
                      <a href="#">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-gray-400 font-semibold mb-4">Support</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <p>support@vornix.com</p>
                  <p>+91 7988571208</p>
                  <p>24/7 Live Chat</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 text-center">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Vornix. All rights reserved.
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Founded by Jatin Sharma
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}