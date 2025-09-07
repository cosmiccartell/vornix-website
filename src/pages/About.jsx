// src/pages/About.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon, ChartBarIcon, CurrencyDollarIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import * as THREE from 'three';

export default function About() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="relative min-h-screen text-white font-sans overflow-x-hidden bg-[#0a0f1a]">
      {/* 3D Financial Chart Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] to-[#0f1d34] opacity-90" />
        <canvas id="aboutCanvas" className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-8 bg-yellow-500/20 px-6 py-2 rounded-full border border-yellow-500/30">
            <span className="text-yellow-400 font-medium">Since 2023</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
            The Institutional Standard <br/> in Retail Funding
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Vornix redefines proprietary trading through rigorous evaluation frameworks and professional-grade infrastructure. 
            We identify and fund only the most disciplined traders using real-market conditions.
          </p>
        </motion.div>

        {/* Core Principles */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: ChartBarIcon,
              title: "Performance-Driven Evaluation",
              content: "Multi-stage challenges testing consistency, risk management, and strategic execution"
            },
            {
              icon: CurrencyDollarIcon,
              title: "Capital Accessibility",
              content: "$600 to $100k+ accounts with clear progression pathways and scaling plans"
            },
            {
              icon: ShieldCheckIcon,
              title: "Market Integrity",
              content: "Advanced monitoring ensuring fair participation and sustainable strategies"
            }
          ].map((principle, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-[#152743] p-8 rounded-2xl border border-gray-700"
            >
              <principle.icon className="w-12 h-12 mb-6 text-yellow-400" />
              <h3 className="text-xl font-bold mb-4">{principle.title}</h3>
              <p className="text-gray-300">{principle.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Program Architecture */}
        <div className="space-y-8 mb-20">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-center mb-12 text-yellow-400"
          >
            Trading Framework
          </motion.h2>

          {/* Compliance Accordions */}
          {[
            {
              title: 'Market Participation Guidelines',
              items: [
                "1:100 Maximum Leverage - Responsible position sizing enforced",
                "Manual Trading Only - No EAs, bots, or automated strategies",
                "News Trading Restrictions - No entries 2min before/after major events",
                "Ethical Execution - No latency arbitrage or price exploitation"
              ]
            },
            {
              title: 'Performance Standards',
              items: [
                "Consistency Monitoring - Profits must show steady progression",
                "Risk-Adjusted Returns - Balanced reward-to-risk ratios required",
                "Position Sizing Logic - Proportional to account balance",
                "Trade Duration Analysis - Sustainable holding periods"
              ]
            },
            {
              title: 'Account Integrity',
              items: [
                "Single Trader Policy - No account sharing",
                "IP Consistency - Geographic login patterns monitored",
                "Strategy Attribution - Clear trading logic verification",
                "Withdrawal Protocols - Bi-weekly profit splits (80/20)"
              ]
            }
          ].map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="border border-gray-700 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection(idx)}
                className="w-full p-6 bg-[#152743] flex justify-between items-center hover:bg-[#1d2f4d] transition-all"
              >
                <h3 className="text-xl font-semibold">{section.title}</h3>
                <ChevronDownIcon className={`w-6 h-6 transform transition-transform ${openSection === idx ? 'rotate-180' : ''}`} />
              </button>
              
              {openSection === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-6 bg-[#0f1d34]"
                >
                  <ul className="space-y-4">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start text-gray-300">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Challenge Tiers */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="space-y-12 mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-yellow-400">
            Evaluation Pathways
          </h2>

          {[
            {
              title: 'Bronze Protocol (4-Stage)',
              color: 'orange',
              stages: [
                { phase: 1, target: '12%', dailyDD: '4%', totalDD: '10%' },
                { phase: 2, target: '10%', dailyDD: '5%', totalDD: '10%' },
                { phase: 3, target: '6%', dailyDD: '4%', totalDD: '10%' },
                { phase: 4, target: '5%', dailyDD: '5%', totalDD: '10%' }
              ]
            },
            {
              title: 'Gold Standard (3-Stage)',
              color: 'yellow',
              stages: [
                { phase: 1, target: '10%', dailyDD: '5%', totalDD: '10%' },
                { phase: 2, target: '8%', dailyDD: '4%', totalDD: '8%' },
                { phase: 3, target: '5%', dailyDD: '4%', totalDD: '8%' }
              ]
            },
            {
              title: 'Diamond Tier (2-Stage)',
              color: 'blue',
              stages: [
                { phase: 1, target: '12%', dailyDD: '4%', totalDD: '8%' },
                { phase: 2, target: '6%', dailyDD: '4%', totalDD: '8%' }
              ]
            }
          ].map((program, idx) => (
            <div key={idx} className={`p-8 rounded-2xl border border-${program.color}-500/30 bg-gradient-to-b from-${program.color}-500/10 to-transparent`}>
              <h3 className="text-2xl font-bold mb-6">{program.title}</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-700">
                      <th className="pb-3">Stage</th>
                      <th className="pb-3">Target</th>
                      <th className="pb-3">Daily DD</th>
                      <th className="pb-3">Total DD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {program.stages.map((stage, i) => (
                      <tr key={i} className="border-b border-gray-700/50 hover:bg-[#152743]/50 transition">
                        <td className="py-4">Phase {stage.phase}</td>
                        <td className="py-4 text-yellow-400">{stage.target}</td>
                        <td className="py-4 text-red-400">{stage.dailyDD}</td>
                        <td className="py-4 text-red-400">{stage.totalDD}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Footer */}
        <footer className="border-t border-gray-800 pt-12 mt-20">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-bold mb-4 text-yellow-400">Vornix Ecosystem</h3>
              <p className="text-gray-400 text-sm">
                Institutional infrastructure meets retail trading talent
              </p>
            </div>
            
            <div>
              <h4 className="text-gray-400 font-semibold mb-4">Trading Programs</h4>
              <ul className="space-y-2">
                {['Evaluation Challenges', 'Funded Accounts', 'Capital Scaling'].map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-300 hover:text-yellow-400 transition">
                    <a href="#">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-gray-400 font-semibold mb-4">Compliance</h4>
              <ul className="space-y-2">
                {['Terms of Service', 'Privacy Policy', 'Risk Disclosure'].map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-300 hover:text-yellow-400 transition">
                    <a href="#">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-gray-400 font-semibold mb-4">Institutional Partners</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <p>Liquidity Providers</p>
                <p>Prime Brokers</p>
                <p>Regulatory Advisors</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-500">
              Â© {new Date().getFullYear()} Vornix Funding. All rights reserved.
            </p>
            <p className="text-xs text-gray-600 mt-2">
              CFTC Rule 4.41 - Past performance is not indicative of future results.
            </p>
          </div>
        </footer>
      </div>

      <CanvasScript />
    </div>
  );
}

// Enhanced 3D Background
function CanvasScript() {
  React.useEffect(() => {
    const canvas = document.getElementById('aboutCanvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas,
      antialias: true,
      alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a0f1a, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    camera.position.z = 30;
    camera.position.y = 15;
    camera.lookAt(0, 0, 0);

    // Create financial elements
    const elements = [];
    const GRID_SIZE = 20;
    
    // Grid
    const gridGeometry = new THREE.BoxGeometry(GRID_SIZE, 0.1, GRID_SIZE);
    const gridMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x2d3748,
      wireframe: true
    });
    const grid = new THREE.Mesh(gridGeometry, gridMaterial);
    scene.add(grid);

    // Candlesticks
    for(let i = 0; i < 50; i++) {
      const height = Math.random() * 5 + 1;
      const geometry = new THREE.BoxGeometry(0.8, height, 0.8);
      const material = new THREE.MeshPhongMaterial({
        color: Math.random() > 0.5 ? 0x00C805 : 0xFF0000,
        transparent: true,
        opacity: 0.8
      });
      const candle = new THREE.Mesh(geometry, material);
      candle.position.x = (Math.random() - 0.5) * GRID_SIZE;
      candle.position.z = (Math.random() - 0.5) * GRID_SIZE;
      candle.position.y = height/2;
      scene.add(candle);
      elements.push(candle);
    }

    // Animation
    let frame = 0;
    const animate = () => {
      requestAnimationFrame(animate);

      elements.forEach((candle, i) => {
        candle.position.y = (Math.sin(frame * 0.02 + i)) + 1;
        candle.rotation.y += 0.01;
      });

      camera.position.x = Math.sin(frame * 0.005) * 30;
      camera.lookAt(0, 10, 0);

      frame += 0.5;
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      scene.traverse(child => {
        if(child.isMesh) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return null;
}
