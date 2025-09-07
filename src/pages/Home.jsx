import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0f1a] to-[#0f1d34]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#00d4ff] mx-auto mb-4"></div>
          <p className="text-white text-lg font-light">Loading Vornix...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white font-sans overflow-x-hidden bg-gradient-to-br from-[#0a0f1a] to-[#0f1d34]">
      <Helmet>
        <title>Vornix | Global Prop Firm with an Indian Heart</title>
      </Helmet>

      {/* Navigation */}
      <nav className="relative z-10 bg-black/30 backdrop-blur-md py-4 px-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] to-[#9b59b6]">VORNIX</span>
            <span className="ml-2 text-sm text-[#00d4ff] font-medium hidden md:block">Global Prop Firm with an Indian Heart</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#why-us" className="text-gray-300 hover:text-white font-medium">Why Us</a>
            <a href="#process" className="text-gray-300 hover:text-white font-medium">Process</a>
            <a href="#markets" className="text-gray-300 hover:text-white font-medium">Markets</a>
            <a href="#pricing" className="text-gray-300 hover:text-white font-medium">Pricing</a>
            <a href="#contact" className="text-gray-300 hover:text-white font-medium">Contact</a>
          </div>
          <div className="flex space-x-4">
            <Link to="/login" className="px-4 py-2 text-gray-300 font-medium hover:text-white">
              Login
            </Link>
            <Link to="/register" className="px-4 py-2 bg-gradient-to-r from-[#00d4ff] to-[#9b59b6] text-white font-medium rounded-md hover:shadow-lg hover:shadow-[#00d4ff]/30 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20 max-w-7xl mx-auto text-center z-10">
        <div className="relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-[#00d4ff]/10 rounded-full mb-6 border border-[#00d4ff]/30 backdrop-blur-sm">
            <div className="w-2 h-2 bg-[#00d4ff] rounded-full mr-2 animate-pulse"></div>
            <span className="text-[#00d4ff] font-medium">Global Prop Firm with an Indian Heart</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] via-[#9b59b6] to-[#ff7e5f]">Funding the Future</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] via-[#9b59b6] to-[#ff7e5f]">of Trading</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-xl text-gray-300 mb-6">
            Empowering traders worldwide with a strong focus on Indian talent. Access global markets with transparent, affordable evaluation challenges.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link to="/register" className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#00d4ff] to-[#9b59b6] hover:from-[#00d4ff] hover:to-[#00d4ff] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Start Your Challenge Today
            </Link>
            <Link to="/pricing" className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-[#00d4ff] text-[#00d4ff] font-bold rounded-full hover:bg-[#00d4ff]/10 transition-all duration-300 transform hover:-translate-y-1">
              View Pricing
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
            {[
              ['Markets', 'Forex, Crypto, Indices'],
              ['Leverage', 'Up to 1:500'],
              ['Payouts', 'Weekly/Bi-weekly'],
              ['Support', '24/7']
            ].map(([value, text], idx) => (
              <div key={idx} className="bg-[#0a0f1a]/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30">
                <div className="text-2xl font-bold text-[#00d4ff] mb-2">{value}</div>
                <div className="text-gray-400">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="relative py-20 bg-gradient-to-b from-[#0f1d34]/50 to-[#152743]/50 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Solving Trader Challenges</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              We address the fundamental problems traders face in today's market
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-[#0a0f1a]/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/30">
              <h3 className="text-2xl font-bold mb-6 text-red-400">Common Challenges</h3>
              <ul className="space-y-4">
                {[
                  'Lack of trading capital to scale',
                  'High risk of personal loss using own funds',
                  'Unfair prop firms with hidden rules',
                  'Expensive evaluation fees',
                  'Delayed or unreliable payouts',
                  'Limited market access',
                  'Lack of community and guidance'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[#0a0f1a]/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/30">
              <h3 className="text-2xl font-bold mb-6 text-green-400">Our Solutions</h3>
              <ul className="space-y-4">
                {[
                  'We provide capital to successful traders',
                  'Trade with our funds, not your savings',
                  'Transparent rules with no hidden restrictions',
                  'Affordable challenges for Indian/Asian traders',
                  'Fast, flexible payouts via multiple methods',
                  'Access to global markets (Forex, Crypto, Indices, Commodities)',
                  'Supportive community with mentorship'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="relative py-20 bg-gradient-to-b from-[#0a0f1a] to-[#0f1d34] z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Vornix</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              We're redefining what it means to be a prop trading firm
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Affordable Challenges",
                description: "Lowest-cost evaluation challenges designed for accessibility",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                gradient: "from-blue-500 to-blue-700"
              },
              {
                title: "Transparent Rules",
                description: "Clear evaluation criteria, simple profit targets, fair drawdown limits",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                gradient: "from-purple-500 to-purple-700"
              },
              {
                title: "Real Funded Accounts",
                description: "Trade live accounts with real liquidity at funding stage",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                gradient: "from-green-500 to-green-700"
              },
              {
                title: "Fast Payouts",
                description: "Weekly/Bi-weekly payouts, multiple withdrawal options",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                gradient: "from-orange-500 to-orange-700"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#0a0f1a]/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/30 hover:border-[#00d4ff]/30 transition-all duration-300 hover:-translate-y-2">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center text-white mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets Section */}
      <section id="markets" className="relative py-20 bg-gradient-to-b from-[#0f1d34]/50 to-[#152743]/50 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Global Market Access</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Trade a wide range of instruments across global markets
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Forex",
                description: "Major, minor and exotic currency pairs",
                icon: "💱",
                gradient: "from-blue-500 to-blue-700"
              },
              {
                title: "Indices",
                description: "Global indices including Nifty, Dow Jones, NASDAQ",
                icon: "📈",
                gradient: "from-purple-500 to-purple-700"
              },
              {
                title: "Commodities",
                description: "Gold, silver, oil and other commodities",
                icon: "🛢️",
                gradient: "from-green-500 to-green-700"
              },
              {
                title: "Cryptocurrencies",
                description: "Major cryptocurrencies with competitive spreads",
                icon: "₿",
                gradient: "from-orange-500 to-orange-700"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#0a0f1a]/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/30 text-center">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center text-2xl mx-auto mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evaluation Process Section */}
      <section id="process" className="relative py-20 bg-gradient-to-b from-[#0a0f1a] to-[#0f1d34] z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Evaluation Process</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Our straightforward path to becoming a funded trader
            </p>
          </div>
          
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-12 h-1 w-full md:w-4/5 bg-gray-700">
              <div className="h-full bg-gradient-to-r from-[#00d4ff] to-[#9b59b6] w-4/5"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              {[
                { step: "1", title: "Sign Up", desc: "Choose your challenge", time: "Instant Access" },
                { step: "2", title: "Evaluation", desc: "Meet profit targets", time: "Flexible Timeline" },
                { step: "3", title: "Verification", desc: "Confirm consistency", time: "5 Trading Days" },
                { step: "4", title: "Funded", desc: "Receive funded account", time: "Within 24 Hours" },
                { step: "5", title: "Get Paid", desc: "Earn up to 90% profit share", time: "Weekly Payouts" }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#9b59b6] flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-1">{item.desc}</p>
                  <p className="text-[#00d4ff] text-xs">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-20 bg-gradient-to-b from-[#0f1d34]/50 to-[#152743]/50 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Affordable Evaluation Challenges</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Choose the challenge that fits your trading style and goals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Standard Challenge",
                price: "$99",
                description: "Perfect for new traders starting their journey",
                features: ["1:100 Leverage", "8% Profit Target", "5% Daily Drawdown", "6% Maximum Drawdown", "No Time Limit", "1 Free Retry"],
                color: "from-blue-500 to-blue-700",
                popular: false
              },
              {
                title: "Rapid Challenge",
                price: "$149",
                description: "For experienced traders ready to scale",
                features: ["1:200 Leverage", "10% Profit Target", "6% Daily Drawdown", "8% Maximum Drawdown", "30 Day Time Limit", "2 Free Retries", "Priority Support"],
                color: "from-purple-500 to-purple-700",
                popular: true
              },
              {
                title: "Pro Challenge",
                price: "$249",
                description: "For professional traders seeking maximum capital",
                features: ["1:500 Leverage", "10% Profit Target", "5% Daily Drawdown", "10% Maximum Drawdown", "EAs & Algorithms Allowed", "4 Free Retries", "Dedicated Account Manager"],
                color: "from-orange-500 to-orange-700",
                popular: false
              }
            ].map((plan, idx) => (
              <div key={idx} className={`bg-[#0a0f1a]/60 backdrop-blur-sm rounded-2xl border ${plan.popular ? 'border-[#00d4ff]' : 'border-gray-700/30'} overflow-hidden transition-all duration-300 hover:scale-105`}>
                {plan.popular && (
                  <div className="bg-[#00d4ff] text-white text-center py-2 font-bold">
                    MOST POPULAR
                  </div>
                )}
                <div className={`p-6 bg-gradient-to-r ${plan.color} text-white`}>
                  <h3 className="text-2xl font-bold">{plan.title}</h3>
                  <p className="mt-2 opacity-90">{plan.description}</p>
                  <div className="mt-4 text-3xl font-bold">{plan.price}</div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to="/register" 
                    className="block w-full py-3 text-center bg-gradient-to-r from-[#00d4ff] to-[#9b59b6] text-white font-semibold rounded-md hover:shadow-lg hover:shadow-[#00d4ff]/30 transition-all"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="relative py-20 bg-gradient-to-b from-[#0a0f1a] to-[#0f1d34] z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trust & Security</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              We prioritize the security of your data and funds
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Transparent Agreements",
                description: "Clear, straightforward terms with no hidden clauses",
                icon: "📝"
              },
              {
                title: "Secure Fund Management",
                description: "Segregated accounts with trusted financial institutions",
                icon: "🔒"
              },
              {
                title: "Data Privacy",
                description: "Advanced encryption and strict data protection policies",
                icon: "🛡️"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#0a0f1a]/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/30 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 bg-gradient-to-b from-[#0f1d34]/50 to-[#152743]/50 z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Trading Journey?</h2>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
            Join Vornix today and access global markets with our support and capital
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/register"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#00d4ff] to-[#9b59b6] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Evaluation
            </Link>
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-[#00d4ff] text-[#00d4ff] font-bold rounded-full hover:bg-[#00d4ff]/10 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    
      {/* Footer */}
      <footer id="contact" className="relative border-t border-gray-800/30 bg-[#0a0f1a] z-10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] to-[#9b59b6]">Vornix</h3>
              <p className="text-gray-300 text-sm mb-4">
                Global Prop Firm with an Indian Heart
              </p>
              <p className="text-gray-400 text-sm mb-4">
                Empowering traders worldwide with transparent, affordable funding solutions.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-[#00d4ff] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#00d4ff] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#00d4ff] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.904 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#00d4ff] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-gray-400 font-semibold mb-4">Programs</h4>
              <ul className="space-y-2">
                {['Evaluation Challenges', 'Funded Accounts', 'Scaling Plan', 'Trader Community'].map((item, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-gray-300 hover:text-[#00d4ff] text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h4 className="text-gray-400 font-semibold mb-4">Markets</h4>
              <ul className="space-y-2">
                {['Forex', 'Indices', 'Commodities', 'Cryptocurrencies'].map((item, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-gray-300 hover:text-[#00d4ff] text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h4 className="text-gray-400 font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#00d4ff] text-sm">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#00d4ff] text-sm">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#00d4ff] text-sm">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#00d4ff] text-sm">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800/30 mt-8 pt-8">
            <div className="bg-red-900/20 p-4 rounded-lg mb-6">
              <p className="text-red-300 text-xs">
                <strong>Risk Disclaimer:</strong> Trading foreign exchange and derivatives involves a high risk of loss. 
                Vornix is not a broker, financial advisor, or investment company. All programs are designed for 
                educational and evaluation purposes only. Funded accounts are simulated and not live brokerage accounts.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} Vornix. All rights reserved.
              </p>
              
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-[#00d4ff] text-sm">Terms & Conditions</a>
                <a href="#" className="text-gray-400 hover:text-[#00d4ff] text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-[#00d4ff] text-sm">Risk Disclaimer</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}