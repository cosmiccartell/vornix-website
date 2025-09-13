// This file contains the "products" you sell.
// It is the single source of truth for your challenges.

const challengeBlueprints = [
  // --- Basic Challenge (News Restricted) ---
  { challengeType: 'Basic', accountSize: 600, price: 7, evaluationStages: 3, profitTargets: [10, 8, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: false, profitSplit: 85 },
  { challengeType: 'Basic', accountSize: 1000, price: 10, evaluationStages: 3, profitTargets: [10, 8, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: false, profitSplit: 85 },
  { challengeType: 'Basic', accountSize: 2500, price: 22, evaluationStages: 3, profitTargets: [10, 8, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: false, profitSplit: 85 },
  { challengeType: 'Basic', accountSize: 5000, price: 32, evaluationStages: 3, profitTargets: [10, 8, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: false, profitSplit: 85 },
  { challengeType: 'Basic', accountSize: 10000, price: 63, evaluationStages: 3, profitTargets: [10, 8, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: false, profitSplit: 85 },
  { challengeType: 'Basic', accountSize: 25000, price: 147, evaluationStages: 3, profitTargets: [10, 8, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: false, profitSplit: 85 },
  { challengeType: 'Basic', accountSize: 50000, price: 270, evaluationStages: 3, profitTargets: [10, 8, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: false, profitSplit: 85 },
  { challengeType: 'Basic', accountSize: 100000, price: 590, evaluationStages: 3, profitTargets: [10, 8, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: false, profitSplit: 85 },
  
  // --- Standard Challenge (News Allowed) ---
  { challengeType: 'Standard', accountSize: 2500, price: 25, evaluationStages: 2, profitTargets: [10, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: true, profitSplit: 90 },
  { challengeType: 'Standard', accountSize: 5000, price: 35, evaluationStages: 2, profitTargets: [10, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: true, profitSplit: 90 },
  { challengeType: 'Standard', accountSize: 10000, price: 65, evaluationStages: 2, profitTargets: [10, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: true, profitSplit: 90 },
  { challengeType: 'Standard', accountSize: 25000, price: 150, evaluationStages: 2, profitTargets: [10, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: true, profitSplit: 90 },
  { challengeType: 'Standard', accountSize: 50000, price: 275, evaluationStages: 2, profitTargets: [10, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: true, profitSplit: 90 },
  { challengeType: 'Standard', accountSize: 100000, price: 650, evaluationStages: 2, profitTargets: [10, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: true, profitSplit: 90 },
  
  // --- Flex Challenge (Deferred Payment) ---
  { challengeType: 'Flex', accountSize: 2500, price: 25, priceUpfront: 5, priceAfterPass: 20, evaluationStages: 3, profitTargets: [10, 8, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: false, profitSplit: 90 },
  { challengeType: 'Flex', accountSize: 5000, price: 35, priceUpfront: 7, priceAfterPass: 28, evaluationStages: 3, profitTargets: [10, 8, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: false, profitSplit: 90 },
  { challengeType: 'Flex', accountSize: 10000, price: 65, priceUpfront: 13, priceAfterPass: 52, evaluationStages: 3, profitTargets: [10, 8, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: false, profitSplit: 90 },
  { challengeType: 'Flex', accountSize: 25000, price: 150, priceUpfront: 30, priceAfterPass: 120, evaluationStages: 3, profitTargets: [10, 8, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: false, profitSplit: 90 },
  { challengeType: 'Flex', accountSize: 50000, price: 275, priceUpfront: 55, priceAfterPass: 220, evaluationStages: 3, profitTargets: [10, 8, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: false, profitSplit: 90 },
  { challengeType: 'Flex', accountSize: 100000, price: 650, priceUpfront: 130, priceAfterPass: 520, evaluationStages: 3, profitTargets: [10, 8, 5], dailyDrawdown: 5, maxDrawdown: 10, minTradingDays: 5, isNewsTradingAllowed: false, profitSplit: 90 },

  // --- Rapid Challenge (1-Step) ---
  { challengeType: 'Rapid', accountSize: 10000, price: 88, evaluationStages: 1, profitTargets: [15], dailyDrawdown: 4, maxDrawdown: 8, timeLimitDays: 30, minTradingDays: 10, isNewsTradingAllowed: true, profitSplit: 90 },
  { challengeType: 'Rapid', accountSize: 25000, price: 199, evaluationStages: 1, profitTargets: [15], dailyDrawdown: 4, maxDrawdown: 8, timeLimitDays: 30, minTradingDays: 10, isNewsTradingAllowed: true, profitSplit: 90 },
  { challengeType: 'Rapid', accountSize: 50000, price: 399, evaluationStages: 1, profitTargets: [15], dailyDrawdown: 4, maxDrawdown: 8, timeLimitDays: 30, minTradingDays: 10, isNewsTradingAllowed: true, profitSplit: 90 },
];

export default challengeBlueprints;
