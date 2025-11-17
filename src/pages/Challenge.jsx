import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

// Skeleton (loading UI)
const ChallengeSkeleton = () => (
  <div className="bg-[#0f1d34] rounded-2xl border border-gray-700 p-6 flex flex-col justify-between h-80 animate-pulse">
    <div>
      <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
      <div className="h-8 bg-gray-600 rounded w-2/3 mt-1 mb-6"></div>
      <div className="space-y-3">
        <div className="h-3 bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>
    <div className="h-10 bg-gray-700 rounded w-1/3 self-end"></div>
  </div>
);

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loaderRef = useRef(null);

  // Fetch challenges paginated
  const fetchPage = async (pageNumber = 1) => {
    try {
      if (pageNumber === 1) setLoading(true);
      else setLoadingMore(true);

      const res = await fetch(
        `${API_BASE}/api/public/challenges?page=${pageNumber}`
      );
      const json = await res.json();

      if (json.success) {
        if (pageNumber === 1) {
          setChallenges(json.data);
        } else {
          setChallenges((prev) => [...prev, ...json.data]);
        }

        setMeta(json.meta);
      }
    } catch (err) {
      console.error("Challenges load error:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchPage(1);
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
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

  // Loading skeleton
  if (loading && challenges.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a1526] text-white">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Our Challenges</h1>
            <p className="text-gray-400">Loading available challenges…</p>
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

  // No challenges
  if (!loading && challenges.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a1526] text-white text-center py-20">
        <h1 className="text-4xl font-bold">No challenges found.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1526] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Our Challenges</h1>
          <p className="text-gray-400">Choose the plan that suits your style.</p>
        </div>

        {/* Challenge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {challenges.map((challenge) => (
            <div
              key={challenge._id}
              className="bg-[#071027] rounded-2xl p-6 border border-gray-800"
            >
              <div className="mb-4">
                <h3 className="text-2xl font-semibold">
                  {challenge.challengeType} • ${challenge.accountSize}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {challenge.shortDescription ||
                    challenge.description?.slice(0, 120)}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">
                    ${challenge.priceUpfront || challenge.price}
                  </p>
                  <p className="text-sm text-gray-400">
                    Profit Split {challenge.profitSplit}%
                  </p>
                </div>

                <Link
                  to={`/checkout/${challenge._id}`}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg"
                >
                  Get Challenge
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Infinite scroll loader */}
        <div ref={loaderRef} className="py-10 text-center">
          {loadingMore && (
            <p className="text-gray-400 animate-pulse">Loading more…</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Challenges;
