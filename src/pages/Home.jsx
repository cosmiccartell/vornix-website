import React, { useState, useEffect, Suspense, useRef, useMemo, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls, Float } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Link } from 'react-router-dom'; // Keep Link for routing

// --- Canonical Data Set ---
const CHALLENGE_DATA = [
  { "challengeType": "Basic", "accountSize": 600, "price": 7, "minTradingDays": 5, "isNewsTradingAllowed": false, "profitSplit": 85, "maxDrawdown": 10, "priceUpfront": null, "timeLimitDays": null },
  { "challengeType": "Basic", "accountSize": 1000, "price": 10, "minTradingDays": 5, "isNewsTradingAllowed": false, "profitSplit": 85, "maxDrawdown": 10, "priceUpfront": null, "timeLimitDays": null },
  { "challengeType": "Basic", "accountSize": 2500, "price": 22, "minTradingDays": 5, "isNewsTradingAllowed": false, "profitSplit": 85, "maxDrawdown": 10, "priceUpfront": null, "timeLimitDays": null },
  { "challengeType": "Basic", "accountSize": 5000, "price": 32, "minTradingDays": 5, "isNewsTradingAllowed": false, "profitSplit": 85, "maxDrawdown": 10, "priceUpfront": null, "timeLimitDays": null },
  { "challengeType": "Basic", "accountSize": 10000, "price": 63, "minTradingDays": 5, "isNewsTradingAllowed": false, "profitSplit": 85, "maxDrawdown": 10, "priceUpfront": null, "timeLimitDays": null },
  { "challengeType": "Basic", "accountSize": 25000, "price": 147, "minTradingDays": 5, "isNewsTradingAllowed": false, "profitSplit": 85, "maxDrawdown": 10, "priceUpfront": null, "timeLimitDays": null },
  { "challengeType": "Basic", "accountSize": 50000, "price": 270, "minTradingDays": 5, "isNewsTradingAllowed": false, "profitSplit": 85, "maxDrawdown": 10, "priceUpfront": null, "timeLimitDays": null },
  { "challengeType": "Basic", "accountSize": 100000, "price": 590, "minTradingDays": 5, "isNewsTradingAllowed": false, "profitSplit": 85, "maxDrawdown": 10, "priceUpfront": null, "timeLimitDays": null },
  { "challengeType": "Standard", "accountSize": 2500, "price": 25, "minTradingDays": 5, "isNewsTradingAllowed": true, "profitSplit": 90, "maxDrawdown": 10, "priceUpfront": null, "timeLimitDays": null },
  { "challengeType": "Standard", "accountSize": 5000, "price": 35, "minTradingDays": 5, "isNewsTradingAllowed": true, "profitSplit": 90, "maxDrawdown": 10, "priceUpfront": null, "timeLimitDays": null },
  { "challengeType": "Standard", "accountSize": 10000, "price": 65, "minTradingDays": 5, "isNewsTradingAllowed": true, "profitSplit": 90, "maxDrawdown": 10, "priceUpfront": null, "timeLimitDays": null },
  { "challengeType": "Standard", "accountSize": 25000, "price": 150, "minTradingDays": 5, "isNewsTradingAllowed": true, "profitSplit": 90, "maxDrawdown": 10, "priceUpfront": null, "timeLimitDays": null },
  { "challengeType": "Standard", "accountSize": 50000, "price": 275, "minTradingDays": 5, "isNewsTradingAllowed": true, "profitSplit": 90, "maxDrawdown": 10, "priceUpfront": null, "timeLimitDays": null },
  { "challengeType": "Standard", "accountSize": 100000, "price": 650, "minTradingDays": 5, "isNewsTradingAllowed": true, "profitSplit": 90, "maxDrawdown": 10, "priceUpfront": null, "timeLimitDays": null },
  { "challengeType": "Flex", "accountSize": 2500, "price": 25, "minTradingDays": 5, "isNewsTradingAllowed": false, "profitSplit": 90, "maxDrawdown": 10, "priceUpfront": 5, "timeLimitDays": null },
  { "challengeType": "Flex", "accountSize": 5000, "price": 35, "minTradingDays": 5, "isNewsTradingAllowed": false, "profitSplit": 90, "maxDrawdown": 10, "priceUpfront": 7, "timeLimitDays": null },
  { "challengeType": "Flex", "accountSize": 10000, "price": 65, "minTradingDays": 5, "isNewsTradingAllowed": false, "profitSplit": 90, "maxDrawdown": 10, "priceUpfront": 13, "timeLimitDays": null },
  { "challengeType": "Flex", "accountSize": 25000, "price": 150, "minTradingDays": 5, "isNewsTradingAllowed": false, "profitSplit": 90, "maxDrawdown": 10, "priceUpfront": 30, "timeLimitDays": null },
  { "challengeType": "Flex", "accountSize": 50000, "price": 275, "minTradingDays": 5, "isNewsTradingAllowed": false, "profitSplit": 90, "maxDrawdown": 10, "priceUpfront": 55, "timeLimitDays": null },
  { "challengeType": "Flex", "accountSize": 100000, "price": 650, "minTradingDays": 5, "isNewsTradingAllowed": false, "profitSplit": 90, "maxDrawdown": 10, "priceUpfront": 130, "timeLimitDays": null },
  { "challengeType": "Rapid", "accountSize": 10000, "price": 88, "minTradingDays": 10, "isNewsTradingAllowed": true, "profitSplit": 90, "maxDrawdown": 8, "priceUpfront": null, "timeLimitDays": 30 },
  { "challengeType": "Rapid", "accountSize": 25000, "price": 199, "minTradingDays": 10, "isNewsTradingAllowed": true, "profitSplit": 90, "maxDrawdown": 8, "priceUpfront": null, "timeLimitDays": 30 },
  { "challengeType": "Rapid", "accountSize": 50000, "price": 399, "minTradingDays": 10, "isNewsTradingAllowed": true, "profitSplit": 90, "maxDrawdown": 8, "priceUpfront": null, "timeLimitDays": 30 }
];
// --- End Canonical Data Set ---

// --- Utilities ---
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const formatCurrency = (value) => {
  if (value === null || value === undefined) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Dummy Helmet for title tag
const Helmet = ({ children }) => {
  useEffect(() => {
    const originalTitle = document.title;
    if (children.props && children.props.children) {
      document.title = children.props.children;
    }
    return () => {
      document.title = originalTitle;
    };
  }, [children]);
  return null;
};

export const onStartChallenge = (challenge) => {
  console.log(`[Vornix Checkout] Initiating challenge purchase: ${challenge.challengeType} ${challenge.accountSize}`);
};

// --- Hero3D Component (Merged) ---
const heroUrl = new URL('/models/home-hero.glb', import.meta.url).href;
const heroLowUrl = new URL('/models/home-hero-low.glb', import.meta.url).href;
const fallbackImageUrl = new URL('/images/hero-fallback.png', import.meta.url).href;

const lowPower = typeof navigator !== 'undefined' && (navigator.hardwareConcurrency <= 2 || window.innerWidth < 768);
const modelPath = lowPower ? heroLowUrl : heroUrl;

function Model({ onLoaded }) {
  const group = useRef();
  const gltf = useLoader(GLTFLoader, modelPath);

  useMemo(() => {
    gltf.scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    if (onLoaded) onLoaded();
  }, [gltf, onLoaded]);

  const [hovered, setHovered] = useState(false);
  const scale = hovered ? 1.03 : 1;

  return (
    <Float rotationIntensity={0.25} floatIntensity={0.5}>
      <motion.group
        ref={group}
        scale={scale}
        transition={{ duration: 0.2 }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <primitive object={gltf.scene} />
      </motion.group>
    </Float>
  );
}

const Loader = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-t-4 border-[#00d4ff] border-opacity-20 border-t-[#00d4ff] rounded-full animate-spin"></div>
  </div>
);

function Hero3D() {
  const [isInViewport, setIsInViewport] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => setIsInViewport(true));
          } else {
            setIsInViewport(true);
          }
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  if (!isInViewport && lowPower) {
    return (
      <div ref={heroRef} className="w-full h-full flex items-center justify-center">
        <img
          src={fallbackImageUrl}
          alt="Decorative fallback image of growth sculpture"
          className="max-h-full max-w-full object-contain opacity-70"
        />
      </div>
    );
  }

  return (
    <div ref={heroRef} className="w-full h-full">
      {isInViewport || !lowPower ? (
        <Canvas
          role="img"
          aria-hidden="true"
          camera={{ fov: 35, position: [0, 1.4, 4] }}
          dpr={[1, 2]}
        >
          <Suspense fallback={<Loader />}>
            <directionalLight intensity={1.2} position={[3, 4, 2]} color="#ffffff" castShadow />
            <pointLight intensity={0.6} position={[-3, 1.5, 2]} color="#9b59b6" />
            <Environment preset="city" />
            <ContactShadows position={[0, -0.8, 0]} opacity={0.6} blur={2.5} />
            <Model />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              minPolarAngle={0.6}
              maxPolarAngle={1.7}
              autoRotate={true}
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      ) : (
        <Loader />
      )}
    </div>
  );
}

// --- ChallengeCard Component (Merged) ---
function ChallengeCard({ challenge, index, onCardClick }) {
  const { challengeType, accountSize, price, minTradingDays, isNewsTradingAllowed, profitSplit, maxDrawdown, priceUpfront, timeLimitDays } = challenge;

  const accountSizeFormatted = formatCurrency(accountSize);
  const entryPrice = priceUpfront !== null ? formatCurrency(priceUpfront) + ' Upfront' : formatCurrency(price);
  const timeLimitText = timeLimitDays ? `${timeLimitDays} Days` : 'Unlimited';

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.2, 0.9, 0.3, 1] },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-between cursor-pointer border border-transparent hover:border-[#9b59b6] transition-all duration-200"
      whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.6)' }}
      onClick={() => onCardClick(challenge)}
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-[#e6eef8] leading-tight">{challengeType} Challenge</h3>
          {isNewsTradingAllowed && (<span className="bg-[#00d4ff] text-[#051923] px-2 py-1 rounded-full text-xs font-semibold">News Trading</span>)}
        </div>
        <p className="text-4xl font-extrabold text-[#00d4ff] mb-4">
          {accountSizeFormatted}<span className="text-xl text-[#9fb4d6] font-medium ml-1">Account</span>
        </p>
        <ul className="space-y-2 text-sm text-[#9fb4d6]">
          <li className="flex justify-between"><span className="font-semibold">Entry Fee:</span><span className="text-[#e6eef8] font-mono">{entryPrice}</span></li>
          <li className="flex justify-between"><span className="font-semibold">Profit Split:</span><span className="text-[#e6eef8] font-mono">{profitSplit}%</span></li>
          <li className="flex justify-between"><span className="font-semibold">Max Drawdown:</span><span className="text-[#e6eef8] font-mono">{maxDrawdown}%</span></li>
          <li className="flex justify-between"><span className="font-semibold">Min Trading Days:</span><span className="text-[#e6eef8] font-mono">{minTradingDays}</span></li>
          <li className="flex justify-between"><span className="font-semibold">Time Limit:</span><span className="text-[#e6eef8] font-mono">{timeLimitText}</span></li>
        </ul>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); console.log(`Checkout button clicked for ${challengeType} ${accountSizeFormatted}`); }}
        className="mt-6 w-full bg-[#00d4ff] text-[#051923] hover:brightness-95 rounded-md py-2 px-4 font-bold transition-all duration-150"
        aria-label={`Start ${challengeType} Challenge — ${accountSizeFormatted} account`}
      >
        Start Challenge
      </button>
    </motion.div>
  );
}

// --- ChallengesPreview Component (Merged) ---
function ChallengesPreview({ challenges, onSelectChallenge }) {
  const challengeTypes = useMemo(() => Object.keys(challenges), [challenges]);
  const [activeTab, setActiveTab] = useState(challengeTypes[0] || 'Basic');

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <section id="challenges-preview" className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">Choose Your <span className="text-[#00d4ff]">Challenge</span></h2>
      <nav className="flex justify-center mb-10 overflow-x-auto border-b border-white/10" aria-label="Challenge Types">
        {challengeTypes.map((type) => (
          <button
            key={type}
            role="tab"
            aria-selected={activeTab === type}
            onClick={() => setActiveTab(type)}
            className={`px-4 py-2 mx-1 whitespace-nowrap text-lg font-medium transition-colors duration-200 ${activeTab === type ? 'border-b-4 border-[#00d4ff] text-[#00d4ff]' : 'text-[#9fb4d6] hover:text-[#e6eef8]'}`}
          >
            {type}
          </button>
        ))}
      </nav>
      <motion.div
        key={activeTab}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
      >
        {challenges[activeTab]?.map((challenge, index) => (
          <ChallengeCard key={challenge.accountSize} challenge={challenge} index={index} onCardClick={onSelectChallenge} />
        ))}
      </motion.div>
    </section>
  );
}

// --- WhyUsSection Component (Merged) ---
const IconChart = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5l5.242 4.095c.571.446 1.349.446 1.92 0L17.25 6M12 6.75l-1.5 1.5M10.5 8.25L9 6.75M16.5 10.5l-1.5 1.5M15 12l-1.5 1.5" /></svg>);
const IconScale = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M18.75 6.75h-13.5M18.75 17.25h-13.5M16.5 12h-9" /></svg>);
const IconLock = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5v2.25c0 .108-.063.208-.162.254l-2.022.955a.75.75 0 01-.715 0l-2.022-.955a.25.25 0 01-.162-.254V10.5M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9z" /></svg>);

const sellingPoints = [
  { icon: IconChart, title: 'Transparent Rules', description: 'We offer clear, straightforward trading parameters with no hidden fees or complex structures. Focus solely on your strategy.', },
  { icon: IconScale, title: 'Scale Up Fast', description: 'With a clear scaling plan and high profit splits, Vornix provides the path to manage capital and grow your income rapidly.', },
  { icon: IconLock, title: 'Security & Payouts', description: 'Guaranteed, fast payouts and robust security protocols ensure your funds and data are safe and accessible when you need them.', },
];

function WhyUsSection() {
  return (
    <section id="why-us" className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-16">The <span className="text-[#00d4ff]">Vornix</span> Edge</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {sellingPoints.map((point, index) => (
          <motion.div
            key={point.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm p-8 rounded-xl text-center shadow-2xl"
          >
            <point.icon className="w-12 h-12 mx-auto text-[#9b59b6] mb-4" aria-hidden="true" role="img" />
            <h3 className="text-xl font-semibold mb-3 text-[#e6eef8]">{point.title}</h3>
            <p className="text-[#9fb4d6] text-base">{point.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// --- ChallengeDetailsModal Component (Merged) ---
function ChallengeDetailsModal({ challenge, onClose }) {
  const modalRef = useRef(null);
  const initialFocusRef = useRef(null);
  const { challengeType, accountSize, isNewsTradingAllowed, profitSplit, timeLimitDays } = challenge;

  const accountSizeFormatted = formatCurrency(accountSize);
  const entryPrice = challenge.priceUpfront !== null ? formatCurrency(challenge.priceUpfront) : formatCurrency(challenge.price);
  const timeLimitText = timeLimitDays ? `${timeLimitDays} Days` : 'Unlimited';
  const feeType = challenge.priceUpfront !== null ? 'Upfront Fee' : 'One-time Fee';

  useEffect(() => {
    if (!modalRef.current) return;
    const focusableElements = modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    if (initialFocusRef.current) { initialFocusRef.current.focus(); }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') { onClose(); }
      if (event.key === 'Tab') {
        if (event.shiftKey) { if (document.activeElement === firstFocusable) { lastFocusable.focus(); event.preventDefault(); } }
        else { if (document.activeElement === lastFocusable) { firstFocusable.focus(); event.preventDefault(); } }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => { document.removeEventListener('keydown', handleKeyDown); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" aria-modal="true" role="dialog" aria-labelledby="modal-title">
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-white/5 backdrop-blur-xl rounded-xl w-full max-w-2xl text-[#e6eef8] shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 id="modal-title" className="text-3xl font-bold text-[#00d4ff]">{challengeType} Challenge Details</h2>
          <button onClick={onClose} aria-label="Close challenge details modal" className="text-[#9fb4d6] hover:text-[#e6eef8] transition-colors p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-lg"><p className="text-[#9fb4d6] text-sm">Account Size</p><p className="text-2xl font-bold text-[#e6eef8]">{accountSizeFormatted}</p></div>
            <div className="p-4 bg-white/5 rounded-lg"><p className="text-[#9fb4d6] text-sm">{feeType}</p><p className="text-2xl font-bold text-[#00d4ff]">{entryPrice}</p></div>
            <div className="p-4 bg-white/5 rounded-lg"><p className="text-[#9fb4d6] text-sm">Profit Split</p><p className="text-2xl font-bold text-[#e6eef8]">{profitSplit}%</p></div>
            <div className="p-4 bg-white/5 rounded-lg"><p className="text-[#9fb4d6] text-sm">News Trading</p><p className={`text-2xl font-bold ${isNewsTradingAllowed ? 'text-[#00d4ff]' : 'text-red-400'}`}>{isNewsTradingAllowed ? 'Allowed' : 'Forbidden'}</p></div>
            <div className="p-4 bg-white/5 rounded-lg"><p className="text-[#9fb4d6] text-sm">Min Trading Days</p><p className="text-2xl font-bold text-[#e6eef8]">{challenge.minTradingDays}</p></div>
            <div className="p-4 bg-white/5 rounded-lg"><p className="text-[#9fb4d6] text-sm">Time Limit</p><p className="text-2xl font-bold text-[#e6eef8]">{timeLimitText}</p></div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2">Your Path to Funding</h3>
            <ol className="space-y-3 text-lg">
              <li className="flex items-center space-x-3 text-[#e6eef8]"><span className="bg-[#9b59b6] w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-[#051923]">1</span><span>Buy challenge: Pay the entry fee for your selected account size.</span></li>
              <li className="flex items-center space-x-3 text-[#e6eef8]"><span className="bg-[#9b59b6] w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-[#051923]">2</span><span>Meet rules: Trade within the drawdown and profit targets.</span></li>
              <li className="flex items-center space-x-3 text-[#e6eef8]"><span className="bg-[#9b59b6] w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-[#051923]">3</span><span>Verify results: Pass our quick audit for consistency.</span></li>
              <li className="flex items-center space-x-3 text-[#e6eef8]"><span className="bg-[#9b59b6] w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-[#051923]">4</span><span>Get funded: Receive your funded account with a high profit split.</span></li>
            </ol>
          </div>
        </div>
        <div className="p-6 bg-white/5 border-t border-white/10">
          <button
            ref={initialFocusRef}
            onClick={() => { onStartChallenge(challenge); onClose(); }}
            className="w-full bg-[#00d4ff] text-[#051923] hover:brightness-95 rounded-lg py-3 px-8 text-xl font-bold transition-all duration-150 shadow-lg"
            aria-label={`Confirm and Start ${challengeType} Challenge — ${accountSizeFormatted} account`}
          >
            Start Challenge: {entryPrice}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// --- FooterSimple Component (Merged) ---
function FooterSimple() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-12 border-t border-white/10 mt-20" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-[#9fb4d6] text-sm">
        <div className="mb-4 md:mb-0">
          <p>&copy; {currentYear} <span className="text-[#00d4ff] font-semibold">Vornix.</span> All rights reserved.</p>
        </div>
        <nav aria-label="Legal and contact links">
          <ul className="flex space-x-6">
            <li><a href="/terms" className="hover:text-[#e6eef8] transition-colors">Terms</a></li>
            <li><a href="/privacy" className="hover:text-[#e6eef8] transition-colors">Privacy</a></li>
            <li><a href="/contact" className="hover:text-[#e6eef8] transition-colors">Contact</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}


/**
 * The main Home Page component. It orchestrates the hero, challenges, and other page sections.
 * This version integrates all components into a single file and uses react-router-dom's Link component.
 */
export default function Home() {
  // Use a slight loading delay to ensure assets start loading gracefully
  const [isLoading, setIsLoading] = useState(true); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Reduced delay from 1000ms for better FCP

    return () => clearTimeout(timer);
  }, []);

  const groupedChallenges = useMemo(() => {
    return CHALLENGE_DATA.reduce((acc, challenge) => {
      const type = challenge.challengeType;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(challenge);
      return acc;
    }, {});
  }, []);

  const handleCardClick = useCallback((challenge) => {
    setSelectedChallenge(challenge);
    setIsModalOpen(true);
  }, []);

  if (isLoading) {
    // Keep your original loader for continuity
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1526] to-[#152743]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#00d4ff] mx-auto mb-4"></div>
          <p className="text-white text-lg font-light">Loading Vornix...</p>
        </div>
      </div>
    );
  }

  return (
    // Updated background gradient to match strict requirements
    <div className="min-h-screen font-sans antialiased text-[#e6eef8] bg-gradient-to-b from-[#0a1526] to-[#152743]">
      <Helmet><title>Vornix — Funded Trading Challenges</title></Helmet>

      <header className="py-4 md:py-6 px-4 md:px-8 max-w-7xl mx-auto">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-[#00d4ff]">Vornix</div>
          <div className="flex space-x-4">
            <Link to="/login" className="hidden md:block px-4 py-2 text-[#9fb4d6] font-medium hover:text-[#e6eef8]">
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-[#00d4ff] text-[#051923] hover:brightness-95 rounded-md py-2 px-4 font-semibold transition-all duration-150"
              aria-label="Start Vornix challenge registration"
            >
              Get Funded
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* --- Hero Section --- */}
        <section id="hero" className="relative w-full overflow-hidden pt-12 pb-20 md:pt-24 md:pb-40">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-10 md:gap-8 items-center">
            <div className="z-10 order-2 md:order-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                We Fund Traders. <br />
                <span className="text-[#00d4ff]">Real Rules.</span> Real Payouts.
              </h1>
              <p className="text-xl text-[#9fb4d6] mb-8">
                Take a challenge. Prove your edge. Get funded with up to 90% profit split.
              </p>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection('challenges-preview')}
                  className="bg-[#00d4ff] text-[#051923] hover:brightness-95 rounded-lg py-3 px-8 text-lg font-semibold transition-all duration-150 shadow-lg"
                  aria-label="View Challenges and Pricing"
                >
                  View Challenges
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection('why-us')}
                  className="border border-[#9b59b6] text-[#e6eef8] hover:bg-white/10 rounded-lg py-3 px-8 text-lg font-semibold transition-all duration-150"
                  aria-label="Learn How Vornix Works"
                >
                  How It Works
                </motion.button>
              </div>
            </div>
            <div className="relative h-96 md:h-[500px] order-1 md:order-2 w-full md:pl-8">
              <p className="sr-only">Decorative 3D hero showing growth sculpture</p>
              <Hero3D />
            </div>
          </div>
        </section>

        {/* --- Why Us Section --- */}
        <WhyUsSection />

        {/* --- Challenges Preview Section --- */}
        <ChallengesPreview challenges={groupedChallenges} onSelectChallenge={handleCardClick} />

        {/* --- Challenge Details Modal --- */}
        <AnimatePresence>
          {isModalOpen && selectedChallenge && (
            <ChallengeDetailsModal challenge={selectedChallenge} onClose={() => setIsModalOpen(false)} />
          )}
        </AnimatePresence>
      </main>

      {/* --- Footer --- */}
      <FooterSimple />
    </div>
  );
}
