import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

/* -----------------------------------------
    MODERN CENTER POPUP MODAL
------------------------------------------ */
const InfoModal = ({ challenge, onClose }) => {
  if (!challenge) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-[#0d1a2b] w-full max-w-lg rounded-2xl p-6 text-white shadow-xl relative">

        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-300 text-2xl hover:text-white"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-3xl font-bold mb-4">
          {challenge.challengeType} Challenge – ${challenge.accountSize}
        </h2>

        <div className="space-y-3 text-gray-300">

          <p><strong>Evaluation Profit Target:</strong> {challenge.evaluationProfitTarget}%</p>
          <p><strong>Verification Profit Target:</strong> {challenge.verificationProfitTarget}%</p>
          <p><strong>Max Drawdown:</strong> {challenge.maxDrawdown}%</p>
          <p><strong>Min Trading Days:</strong> {challenge.minTradingDays}</p>
          <p><strong>Time Limit:</strong> {challenge.timeLimitDays || "Unlimited"}</p>
          <p><strong>News Trading:</strong> {challenge.isNewsTradingAllowed ? "Allowed" : "Not Allowed"}</p>
          <p><strong>Profit Split:</strong> {challenge.profitSplit}%</p>

          <p className="pt-3 text-gray-400">
            {challenge.description || "No additional description available."}
          </p>
        </div>

        <div className="mt-6 text-right">
          <Link
            to={`/checkout/${challenge._id}`}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

/* -----------------------------------------
    SKELETON LOADER
------------------------------------------ */
const ChallengeSkeleton = () => (
  <div className="bg-[#0f1d34] rounded-2xl border border-gray-700 p-6 animate-pulse h-80"></div>
);

const Challenges = () => {
  const [allChallenges, setAllChallenges] = useState([]);
  const [tab, setTab] = useState("Basic");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const loaderRef = useRef(null);

  /* -----------------------------------------
      FETCH PAGE (paginated)
  ------------------------------------------ */
  const fetchPage = async (pageNumber = 1) => {
    try {
      if (pageNumber === 1) setLoading(true);
      else setLoadingMore(true);

      const res = await fetch(
        `${API_BASE}/api/public/challenges?page=${pageNumber}`
      );
      const json = await res.json();

      if (json.success) {
        if (pageNumber === 1) setAllChallenges(json.data);
        else setAllChallenges((prev) => [...prev, ...json.data]);

        setMeta(json.meta);
      }
    } catch (error) {
      console.error("Challenges load error:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  /* Initial load */
  useEffect(() => {
    fetchPage(1);
  }, []);

  /* Infinite scroll observer */
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (page < meta.totalPages && !loadingMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchPage(nextPage);
          }
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [page, meta.totalPages, loadingMore]);

  /* Filter challenges by tab */
  const filtered = allChallenges.filter(
    (c) => c.challengeType.toLowerCase() === tab.toLowerCase()
  );

  /* -----------------------------------------
      LOADING STATE
  ------------------------------------------ */
  if (loading && allChallenges.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a1526] text-white">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Our Challenges</h1>
            <p className="text-gray-400">Loading challenges…</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <ChallengeSkeleton />
            <ChallengeSkeleton />
            <ChallengeSkeleton />
            <ChallengeSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* MODAL */}
      <InfoModal
        challenge={selectedChallenge}
        onClose={() => setSelectedChallenge(null)}
      />

      <div className="min-h-screen bg-[#0a1526] text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-center text-5xl font-bold mb-10">
            Our Challenges
          </h1>

          {/* TABS */}
          <div className="flex justify-center mb-10 space-x-4">
            {["Basic", "Standard", "Flex", "Rapid"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setTab(item);
                }}
                className={`px-6 py-2 rounded-lg font-semibold ${
                  tab === item
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((challenge) => (
              <div
                key={challenge._id}
                className="bg-[#071027] rounded-2xl p-6 border border-gray-700"
              >
                <h3 className="text-xl font-bold">
                  {challenge.challengeType} • ${challenge.accountSize}
                </h3>

                <p className="text-gray-400 text-sm mb-6">
                  {challenge.shortDescription ||
                    challenge.description?.slice(0, 100)}
                </p>

                <div className="flex justify-between">
                  <div>
                    <p className="text-3xl font-bold">
                      ${challenge.priceUpfront || challenge.price}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Profit Split {challenge.profitSplit}%
                    </p>
                  </div>

                  {/* More Info Btn */}
                  <button
                    onClick={() => setSelectedChallenge(challenge)}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm font-semibold"
                  >
                    More Info
                  </button>
                </div>

                <Link
                  to={`/checkout/${challenge._id}`}
                  className="mt-4 block w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg text-center"
                >
                  Get Challenge
                </Link>
              </div>
            ))}
          </div>

          {/* Infinite Scroll Loader */}
          <div ref={loaderRef} className="py-10 text-center">
            {loadingMore && (
              <p className="text-gray-400 animate-pulse">Loading more…</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Challenges;
