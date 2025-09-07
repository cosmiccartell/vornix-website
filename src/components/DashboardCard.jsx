import React from 'react';

const DashboardCard = ({ challenge }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-400';
      case 'completed':
        return 'text-blue-400';
      case 'pending':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-[#0f1d34] rounded-xl border border-gray-700 p-6 hover:border-yellow-500/30 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{challenge.accountType} Account</h3>
          <span className={`text-sm font-medium ${getStatusColor(challenge.status)}`}>
            {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
          </span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-yellow-400">${challenge.balance.toLocaleString()}</div>
          <div className="text-sm text-gray-400">Balance</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Progress</span>
          <span>{challenge.progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${getProgressColor(challenge.progress)}`}
            style={{ width: `${challenge.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-400">Start Date</div>
          <div className="text-white">
            {challenge.startDate.toLocaleDateString()}
          </div>
        </div>
        <div>
          <div className="text-gray-400">End Date</div>
          <div className="text-white">
            {challenge.endDate.toLocaleDateString()}
          </div>
        </div>
      </div>

      <button className="w-full mt-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-medium rounded-lg transition-all">
        View Details
      </button>
    </div>
  );
};

export default DashboardCard;