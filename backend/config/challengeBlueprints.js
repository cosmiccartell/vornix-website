// This file contains the "products" you sell.
// It is the single source of truth for your challenges.

const challengeBlueprints = [
  // --- Basic Challenge (News Restricted) ---
  { challengeType: 'Basic', accountSize: 600, price: 7, evaluationStages: 3, profitTargets: [10, 8, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: false, profitSplit: 85 },
  { challengeType: 'Basic', accountSize: 1000, price: 10, evaluationStages: 3, profitTargets: [10, 8, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: false, profitSplit: 85 },
  // ... (add all other Basic sizes here)
  { challengeType: 'Basic', accountSize: 100000, price: 590, evaluationStages: 3, profitTargets: [10, 8, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: false, profitSplit: 85 },
  
  // --- Standard Challenge (News Allowed) ---
  { challengeType: 'Standard', accountSize: 2500, price: 25, evaluationStages: 2, profitTargets: [10, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: true, profitSplit: 90 },
  // ... (add all other Standard sizes here)
  { challengeType: 'Standard', accountSize: 100000, price: 650, evaluationStages: 2, profitTargets: [10, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: true, profitSplit: 90 },
  
  // --- Flex Challenge (Deferred Payment) ---
  { challengeType: 'Flex', accountSize: 2500, price: 25, priceUpfront: 5, priceAfterPass: 20, evaluationStages: 3, profitTargets: [10, 8, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: false, profitSplit: 90 },
  // ... (add all other Flex sizes here)
  { challengeType: 'Flex', accountSize: 100000, price: 650, priceUpfront: 130, priceAfterPass: 520, evaluationStages: 3, profitTargets: [10, 8, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: false, profitSplit: 90 },

  // --- Rapid Challenge (1-Step) ---
  { challengeType: 'Rapid', accountSize: 10000, price: 88, evaluationStages: 1, profitTargets: [15], dailyDrawdown: 4, maxDrawdown: 8, timeLimitDays: 30, minTradingDays: 10, isNewsTradingAllowed: true, profitSplit: 90 },
  { challengeType: 'Rapid', accountSize: 25000, price: 199, evaluationStages: 1, profitTargets: [15], dailyDrawdown: 4, maxDrawdown: 8, timeLimitDays: 30, minTradingDays: 10, isNewsTradingAllowed: true, profitSplit: 90 },
  { challengeType: 'Rapid', accountSize: 50000, price: 399, evaluationStages: 1, profitTargets: [15], dailyDrawdown: 4, maxDrawdown: 8, timeLimitDays: 30, minTradingDays: 10, isNewsTradingAllowed: true, profitSplit: 90 },
];

export default challengeBlueprints;
