import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Challenges() {
  const [activeTab, setActiveTab] = useState('bronze');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hoveredAccount, setHoveredAccount] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const challengeData = {
    bronze: {
      title: "VORNIX BRONZE",
      stages: 4,
      color: "from-orange-500 to-orange-700",
      borderColor: "border-orange-500",
      accounts: [
        { size: "$600", price: 7, id: "bronze-600" },
        { size: "$1,000", price: 11, id: "bronze-1000" },
        { size: "$2,000", price: 13, id: "bronze-2000" },
        { size: "$5,000", price: 25, id: "bronze-5000" },
        { size: "$10,000", price: 45, id: "bronze-10000" },
        { size: "$100,000", price: 150, id: "bronze-100000" }
      ],
      rules: [
        { stage: 1, target: "12%", dailyDD: "4%", totalDD: "10%", timeLimit: "Unlimited" },
        { stage: 2, target: "10%", dailyDD: "5%", totalDD: "10%", timeLimit: "Unlimited" },
        { stage: 3, target: "6%", dailyDD: "4%", totalDD: "10%", timeLimit: "Unlimited" },
        { stage: 4, target: "5%", dailyDD: "5%", totalDD: "10%", timeLimit: "Unlimited" }
      ],
      features: [
        "1:100 Leverage",
        "Manual Trading Only",
        "News Trading Restricted (5min before/after)",
        "Weekend Holding Allowed",
        "No Minimum Trading Days",
        "1 Free Retry Annually"
      ],
      description: "Perfect for beginners starting their trading journey",
      icon: "📊"
    },
    gold: {
      title: "VORNIX GOLD",
      stages: 3,
      color: "from-yellow-500 to-yellow-700",
      borderColor: "border-yellow-500",
      accounts: [
        { size: "$600", price: 14, id: "gold-600" },
        { size: "$1,000", price: 20, id: "gold-1000" },
        { size: "$2,000", price: 40, id: "gold-2000" },
        { size: "$5,000", price: 90, id: "gold-5000" },
        { size: "$10,000", price: 120, id: "gold-10000" },
        { size: "$100,000", price: 200, id: "gold-100000" }
      ],
      rules: [
        { stage: 1, target: "10%", dailyDD: "5%", totalDD: "10%", timeLimit: "30 Days" },
        { stage: 2, target: "8%", dailyDD: "4%", totalDD: "8%", timeLimit: "45 Days" },
        { stage: 3, target: "5%", dailyDD: "4%", totalDD: "8%", timeLimit: "60 Days" }
      ],
      features: [
        "1:200 Leverage",
        "Manual Trading Only",
        "News Trading Restricted (5min before/after)",
        "Unlimited Trading Period",
        "2 Free Retries Annually",
        "Priority Support"
      ],
      description: "For developing traders ready for more challenge",
      icon: "🥇"
    },
    diamond: {
      title: "VORNIX DIAMOND",
      stages: 2,
      color: "from-blue-500 to-blue-700",
      borderColor: "border-blue-500",
      accounts: [
        { size: "$600", price: 25, id: "diamond-600" },
        { size: "$1,000", price: 35, id: "diamond-1000" },
        { size: "$2,000", price: 45, id: "diamond-2000" },
        { size: "$5,000", price: 100, id: "diamond-5000" },
        { size: "$10,000", price: 200, id: "diamond-10000" },
        { size: "$100,000", price: 300, id: "diamond-100000" }
      ],
      rules: [
        { stage: 1, target: "12%", dailyDD: "4%", totalDD: "8%", timeLimit: "30 Days" },
        { stage: 2, target: "6%", dailyDD: "4%", totalDD: "8%", timeLimit: "45 Days" }
      ],
      features: [
        "1:500 Leverage",
        "EAs/Bots Allowed (with approval)",
        "News Trading Restricted (5min before/after)",
        "Personal Account Manager",
        "Priority Withdrawals",
        "Trading Platform Choice",
        "4 Free Retries Annually"
      ],
      description: "For experienced traders seeking significant capital",
      icon: "💎"
    }
  };

  const handleGetStarted = () => {
    if (!isLoggedIn) {
      localStorage.setItem('redirectPath', '/challenges');
      window.location.href = '/login';
      return;
    }
    
    alert("This is a demo. In a real application, you would be redirected to purchase.");
  };

  const ChallengeFeatures = () => (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
        </svg>
        Program Features
      </h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {challengeData[activeTab].features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="relative min-h-screen text-white font-sans overflow-x-hidden">
      {/* Enhanced Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#0c1120] opacity-95"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c1a2b] via-[#0f1d34] to-[#152743]"></div>
        <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMjggMGEyOCwyOCAwIDEsMSA1NiwwYTI4LDI4IDAgMSwxIC01NiwwIiBzdHJva2U9IiMxNjI5NDIiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjEiLz48L3N2Zz4=')]"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-medium"></div>
        <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-500/20 rounded-full mb-6 border border-yellow-400/30">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-yellow-400 font-medium">Professional Funding Programs</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
                Unlock Your Trading Potential
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join India's first proprietary trading firm and access capital, technology, and mentorship 
              to build a sustainable trading career
            </p>
          </div>

          {/* Challenge Tabs */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex bg-gray-900 rounded-xl p-1 border border-gray-700 shadow-2xl">
              {Object.entries({
                bronze: { label: 'Bronze Program', icon: '📊' },
                gold: { label: 'Gold Program', icon: '🥇' },
                diamond: { label: 'Diamond Program', icon: '💎' }
              }).map(([key, { label, icon }]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-8 py-3 rounded-lg transition-all text-sm sm:text-base flex items-center ${
                    activeTab === key 
                      ? `bg-gradient-to-r ${challengeData[key].color} text-black font-bold shadow-md`
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <span className="mr-2">{icon}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Current Challenge */}
          <div className="bg-[#0f1d34]/90 backdrop-blur-lg rounded-2xl border border-gray-700 overflow-hidden shadow-2xl transform transition-all duration-300">
            {/* Challenge Header */}
            <div className={`p-8 bg-gradient-to-r ${challengeData[activeTab].color}`}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold flex items-center">
                    <span className="mr-3">{challengeData[activeTab].icon}</span>
                    {challengeData[activeTab].title}
                  </h2>
                  <p className="opacity-90 mt-2">{challengeData[activeTab].description}</p>
                </div>
                <div className="mt-4 md:mt-0 bg-black/30 px-4 py-2 rounded-full border border-white/10">
                  <span className="text-yellow-300 font-bold">80-90%</span> Profit Split
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 p-8">
              {/* Account Sizes */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold flex items-center">
                    <svg className="w-6 h-6 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                    </svg>
                    Select Your Account Size
                  </h3>
                  <div className="text-xs bg-gray-800/50 px-2 py-1 rounded">
                    One-time evaluation fee
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {challengeData[activeTab].accounts.map((account, index) => (
                    <div 
                      key={index}
                      className={`p-5 rounded-xl border ${challengeData[activeTab].borderColor} bg-gray-800/50 cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${
                        hoveredAccount === account.id ? 'scale-105 bg-gray-700/50' : ''
                      }`}
                      onClick={handleGetStarted}
                      onMouseEnter={() => setHoveredAccount(account.id)}
                      onMouseLeave={() => setHoveredAccount(null)}
                    >
                      <div className="text-2xl font-bold mb-2">{account.size}</div>
                      <div className="text-3xl font-bold text-yellow-400 mb-4">${account.price}</div>
                      <div className="flex justify-end">
                        <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-bold rounded-full transition transform hover:scale-105">
                          Start Evaluation
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <ChallengeFeatures />
              </div>

              {/* Stage Rules */}
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd"/>
                  </svg>
                  Evaluation Rules
                </h3>
                
                <div className="bg-gray-900/50 rounded-xl border border-gray-700 overflow-hidden mb-6">
                  <table className="w-full">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="p-3 text-left text-sm font-medium">Stage</th>
                        <th className="p-3 text-center text-sm font-medium">Target</th>
                        <th className="p-3 text-center text-sm font-medium">Daily DD</th>
                        <th className="p-3 text-center text-sm font-medium">Max DD</th>
                        <th className="p-3 text-center text-sm font-medium">Time Limit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {challengeData[activeTab].rules.map((rule) => (
                        <tr key={rule.stage} className="border-t border-gray-700 hover:bg-gray-800 transition-colors">
                          <td className="p-3 font-medium">Stage {rule.stage}</td>
                          <td className="p-3 text-center text-yellow-400 font-bold">{rule.target}</td>
                          <td className="p-3 text-center">{rule.dailyDD}</td>
                          <td className="p-3 text-center">{rule.totalDD}</td>
                          <td className="p-3 text-center">{rule.timeLimit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Benefits */}
                <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 text-blue-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-bold text-blue-400">Key Benefits</h4>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>No minimum trading days</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Weekend holding allowed</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Profit split up to 90%</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Free retries available</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 bg-yellow-500/10 border border-yellow-400/30 rounded-xl p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 text-yellow-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-bold text-yellow-400">Start Trading Today</h4>
                      <p className="text-sm text-gray-300">Begin your journey to becoming a funded trader</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleGetStarted}
                    className="mt-3 w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
                  >
                    Get Started Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="py-16 bg-[#0a1526]/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Program Comparison</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Find the perfect challenge that matches your trading experience
              </p>
            </div>
            
            <div className="overflow-x-auto rounded-2xl border border-gray-700 shadow-2xl">
              <table className="w-full bg-gray-900/50">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-4 text-left">Features</th>
                    <th className="p-4 text-center bg-orange-500/10">Bronze</th>
                    <th className="p-4 text-center bg-yellow-500/10">Gold</th>
                    <th className="p-4 text-center bg-blue-500/10">Diamond</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 font-medium">Evaluation Stages</td>
                    <td className="p-4 text-center">4</td>
                    <td className="p-4 text-center">3</td>
                    <td className="p-4 text-center">2</td>
                  </tr>
                  <tr className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 font-medium">Minimum Trading Days</td>
                    <td className="p-4 text-center">0</td>
                    <td className="p-4 text-center">5</td>
                    <td className="p-4 text-center">5</td>
                  </tr>
                  <tr className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 font-medium">Profit Target</td>
                    <td className="p-4 text-center">12% / 10% / 6% / 5%</td>
                    <td className="p-4 text-center">10% / 8% / 5%</td>
                    <td className="p-4 text-center">12% / 6%</td>
                  </tr>
                  <tr className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 font-medium">Max Daily Drawdown</td>
                    <td className="p-4 text-center">4-5%</td>
                    <td className="p-4 text-center">4-5%</td>
                    <td className="p-4 text-center">4%</td>
                  </tr>
                  <tr className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 font-medium">Leverage</td>
                    <td className="p-4 text-center">1:100</td>
                    <td className="p-4 text-center">1:200</td>
                    <td className="p-4 text-center">1:500</td>
                  </tr>
                  <tr className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 font-medium">Free Retries</td>
                    <td className="p-4 text-center">1 annually</td>
                    <td className="p-4 text-center">2 annually</td>
                    <td className="p-4 text-center">4 annually</td>
                  </tr>
                  <tr className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 font-medium">Starting Price</td>
                    <td className="p-4 text-center text-yellow-400 font-bold">$7</td>
                    <td className="p-4 text-center text-yellow-400 font-bold">$14</td>
                    <td className="p-4 text-center text-yellow-400 font-bold">$25</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-300">
                Everything you need to know about our evaluation programs
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  question: "How long does the evaluation process take?",
                  answer: "There's no time limit for the Bronze program. For Gold and Diamond programs, you have 30-60 days per stage depending on the challenge."
                },
                {
                  question: "What happens if I pass the evaluation?",
                  answer: "Once you pass, you'll receive a funded account with real capital. You'll keep up to 90% of the profits you make."
                },
                {
                  question: "Is there a profit target for funded accounts?",
                  answer: "No, once you become a funded trader, there are no profit targets. You simply trade and earn."
                },
                {
                  question: "What trading strategies are allowed?",
                  answer: "We allow all manual trading strategies. Expert Advisors (EAs) and bots are permitted only in our Diamond program with prior approval."
                },
                {
                  question: "Can I get a refund?",
                  answer: "Evaluation fees are non-refundable as they cover the cost of providing our platform and resources."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gray-900/50 rounded-xl border border-gray-700 overflow-hidden transition-all hover:border-yellow-500/30">
                  <button className="w-full p-5 text-left flex justify-between items-center">
                    <span className="font-medium">{faq.question}</span>
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                  </button>
                  <div className="px-5 pb-5 text-gray-300">
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="py-20 bg-gradient-to-br from-[#0c1a2b] to-[#1a2a48]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Trade With Professional Capital?
            </h2>
            <p className="text-xl mb-8">
              Start your evaluation today and join our funded traders program
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={handleGetStarted}
                className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started Now
              </button>
              <Link to="/faq" className="px-8 py-4 bg-transparent border-2 border-yellow-500 text-yellow-400 font-bold rounded-full hover:bg-yellow-500/10 transition-all duration-300 transform hover:-translate-y-1">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}