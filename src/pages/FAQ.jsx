import React, { useState } from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon, CurrencyDollarIcon, ScaleIcon, ShieldCheckIcon, ArrowPathIcon, ChartBarIcon, CreditCardIcon, CogIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqItems = [
    {
      icon: CurrencyDollarIcon,
      category: 'Account & Funding',
      questions: [
        {
          q: "What account sizes do you offer?",
          a: "We offer funding from $600 up to $100,000 across our Bronze, Gold, and Diamond programs. Our tiered approach allows traders to start small and scale up as they demonstrate consistent profitability."
        },
        {
          q: "What is the minimum deposit required?",
          a: "We require a one-time fee to start your evaluation, ranging from $99 for our Bronze program to $599 for our Diamond program. This fee covers platform access and risk management services."
        },
        {
          q: "How long does funding take?",
          a: "Once you pass your evaluation, funded accounts are typically activated within 24-48 hours. We prioritize quick onboarding so you can start trading with real capital immediately."
        }
      ]
    },
    {
      icon: ScaleIcon,
      category: 'Evaluation Process',
      questions: [
        {
          q: "How many evaluation phases are there?",
          a: "Our programs have progressive evaluation stages: Bronze (4 phases), Gold (3 phases), and Diamond (2 phases). Each phase has decreasing profit targets and increasing trading freedom."
        },
        {
          q: "Can I retry if I fail?",
          a: "Yes! We offer 1-4 free retries annually depending on your program tier. We believe in giving talented traders second chances to demonstrate their skills."
        },
        {
          q: "What are the profit targets?",
          a: "Profit targets range from 8% in Phase 1 to 5% in final phases. We've designed these targets to be achievable while maintaining professional trading standards."
        }
      ]
    },
    {
      icon: ShieldCheckIcon,
      category: 'Trading Rules',
      questions: [
        {
          q: "What's the maximum leverage?",
          a: "We offer 1:100 leverage across all account sizes with dynamic trailing drawdown protection. This provides flexibility while maintaining responsible risk management."
        },
        {
          q: "Are there trading style restrictions?",
          a: "We allow all manual trading strategies. Expert Advisors (EAs) and bots are permitted in our Diamond program with prior approval. News trading is restricted 5 minutes before and after major economic announcements."
        },
        {
          q: "What instruments can I trade?",
          a: "Trade 80+ instruments including Forex pairs, commodities, indices, and cryptocurrencies. Our Diamond traders get access to exclusive instruments including futures and options."
        }
      ]
    },
    {
      icon: ArrowPathIcon,
      category: 'Profit Split & Withdrawals',
      questions: [
        {
          q: "What's the profit split structure?",
          a: "Earn 80% on your first $10k profits, 85% on $10k-$50k, and 90% beyond $50k. Our Diamond traders start at 85% with no profit ceiling."
        },
        {
          q: "How often can I withdraw profits?",
          a: "Withdrawals are processed bi-weekly with no fees. First withdrawal requires a minimum of $500, subsequent withdrawals have no minimum."
        },
        {
          q: "What payment methods do you support?",
          a: "We support bank transfers, PayPal, Skrill, Neteller, and cryptocurrency payments. Withdrawals are processed within 48 hours."
        }
      ]
    },
    {
      icon: ChartBarIcon,
      category: 'Account Scaling',
      questions: [
        {
          q: "How does account scaling work?",
          a: "Consistent traders can grow their accounts by 25% every 3 months after achieving 10% profit without violating rules. Maximum account size is $500,000."
        },
        {
          q: "Are there performance bonuses?",
          a: "Yes! Achieve 15% monthly profit for 3 consecutive months and receive a 10% bonus on your account balance. Diamond traders qualify for additional performance incentives."
        },
        {
          q: "Can I trade multiple accounts?",
          a: "Professional traders can manage up to 5 accounts simultaneously. We offer discounted evaluation fees for multiple accounts."
        }
      ]
    },
    {
      icon: CogIcon,
      category: 'Platforms & Tools',
      questions: [
        {
          q: "Which trading platforms do you support?",
          a: "We support MetaTrader 4, MetaTrader 5, and our proprietary Vornix WebTrader with advanced charting, one-click trading, and custom indicators."
        },
        {
          q: "Do you provide trading tools?",
          a: "All traders receive free access to our economic calendar, advanced charting tools, and market analysis. Diamond traders get premium tools including algorithmic trading support."
        },
        {
          q: "Is mobile trading supported?",
          a: "Yes, our platforms are fully compatible with iOS and Android devices. Trade anywhere with our secure mobile applications."
        }
      ]
    },
    {
      icon: CreditCardIcon,
      category: 'Verification & KYC',
      questions: [
        {
          q: "What documents are required?",
          a: "We require a government-issued ID and proof of address. Verification typically takes 1-2 business days after document submission."
        },
        {
          q: "Is my personal information secure?",
          a: "We use bank-level 256-bit SSL encryption and never share your data with third parties. All information is stored in GDPR-compliant systems."
        },
        {
          q: "Do you accept traders worldwide?",
          a: "We accept traders from over 150 countries. Restrictions apply to residents of OFAC-sanctioned countries."
        }
      ]
    },
    {
      icon: QuestionMarkCircleIcon,
      category: 'General',
      questions: [
        {
          q: "How is Vornix different from other prop firms?",
          a: "We offer the industry's highest profit splits (up to 90%), fastest withdrawal processing (48 hours), and most flexible trading rules. Our tiered programs cater to all experience levels."
        },
        {
          q: "What support do you provide?",
          a: "24/7 multilingual support via live chat, email, and phone. All traders receive a dedicated account manager and weekly market analysis."
        },
        {
          q: "Do you offer educational resources?",
          a: "Access our exclusive trading academy with 200+ video lessons, weekly webinars, and personalized coaching options. Diamond traders receive 1-on-1 mentorship."
        }
      ]
    }
  ];

  const filteredItems = faqItems
  .map(section => {
    const filteredQuestions = section.questions.filter(item =>
      item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.a.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...section, questions: filteredQuestions };
  })
  .filter(section => section.questions.length > 0);

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0f1d34] to-[#0a1526] pb-20 pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
                Trading Knowledge Center
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-10">
              Everything you need to know about our funding programs, trading rules, and account management
            </p>
            
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search our knowledge base..."
                className="w-full pl-12 pr-4 py-4 bg-[#152743] rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 -mt-10">
        {filteredItems.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {filteredItems.map((section, sectionIndex) => (
              <div 
                key={sectionIndex} 
                className="bg-[#152743] rounded-2xl p-6 border border-gray-700 hover:border-yellow-500/30 transition-colors"
              >
                <div className="flex items-center mb-6">
                  <section.icon className="h-10 w-10 p-2 bg-yellow-500/10 text-yellow-400 rounded-lg" />
                  <h2 className="text-2xl font-bold ml-4 text-yellow-400">{section.category}</h2>
                </div>
                
                <div className="space-y-4">
                  {section.questions.map((item, itemIndex) => (
                    <div 
                      key={itemIndex}
                      className={`bg-[#0f1d34] rounded-xl overflow-hidden transition-all ${
                        openQuestion === item.q ? 'border border-yellow-500/30' : ''
                      }`}
                    >
                      <button
                        onClick={() => setOpenQuestion(openQuestion === item.q ? null : item.q)}
                        className="w-full p-5 flex justify-between items-center text-left"
                      >
                        <h3 className="font-medium text-lg pr-4">{item.q}</h3>
                        <ChevronDownIcon className={`flex-shrink-0 w-6 h-6 transform transition-transform ${
                          openQuestion === item.q ? 'rotate-180 text-yellow-400' : 'text-gray-400'
                        }`} />
                      </button>
                      
                      {openQuestion === item.q && (
                        <div className="px-5 pb-5">
                          <p className="text-gray-300">{item.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <MagnifyingGlassIcon className="h-16 w-16 mx-auto text-gray-500 mb-4" />
            <h3 className="text-2xl font-bold text-gray-400">No results found</h3>
            <p className="text-gray-500 mt-2">
              Try different search terms or browse our categories
            </p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 rounded-full text-black font-medium transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#0f1d34] to-[#0a1526] border-t border-b border-gray-800 py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Trade with <span className="text-yellow-400">Vornix Capital</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Join thousands of funded traders using our institutional-grade platform and capital
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full text-black font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              Start Evaluation Now
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-yellow-500 text-yellow-400 rounded-full font-bold text-lg hover:bg-yellow-500/10 transition-colors">
              Schedule a Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Comprehensive Footer */}
      <footer className="bg-[#0a1526] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="relative">
                  <span className="text-3xl font-bold text-yellow-400 z-10 relative tracking-wider">
                    VORNIX
                  </span>
                  <span className="absolute inset-0 text-3xl font-bold text-yellow-600 blur-sm opacity-70 tracking-wider">
                    VORNIX
                  </span>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Professional trading capital for talented traders worldwide
              </p>
              <div className="flex space-x-4">
                {['Twitter', 'LinkedIn', 'YouTube', 'Instagram'].map((platform) => (
                  <div key={platform} className="p-2 border border-gray-700 rounded-lg hover:border-yellow-500 hover:text-yellow-400 transition-colors cursor-pointer">
                    {platform}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-yellow-400">Funding Programs</h3>
              <ul className="space-y-3">
                {['Bronze Program', 'Gold Program', 'Diamond Program', 'Institutional Tier'].map((item) => (
                  <li key={item} className="text-gray-400 hover:text-yellow-400 transition-colors cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-yellow-400">Legal & Compliance</h3>
              <ul className="space-y-3">
                {['Terms of Service', 'Privacy Policy', 'Risk Disclosure', 'Refund Policy', 'KYC Procedures'].map((item) => (
                  <li key={item} className="text-gray-400 hover:text-yellow-400 transition-colors cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-yellow-400">Contact Us</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-400 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  support@vornixcapital.com
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-400 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  +1 (555) 123-4567
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-400 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  123 Trading Avenue, New York, NY 10001
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                Â© {new Date().getFullYear()} Vornix Funding LLC. All rights reserved. 
                <span className="block md:inline-block md:ml-2 mt-1 md:mt-0">
                  CFTC Rule 4.41: Hypothetical performance results have inherent limitations.
                </span>
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <div className="h-8 w-12 bg-gray-700 rounded flex items-center justify-center opacity-70">VISA</div>
                <div className="h-8 w-12 bg-gray-700 rounded flex items-center justify-center opacity-70">MC</div>
                <div className="h-8 w-12 bg-gray-700 rounded flex items-center justify-center opacity-70">PP</div>
                <div className="h-8 w-12 bg-gray-700 rounded flex items-center justify-center opacity-70">BTC</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
