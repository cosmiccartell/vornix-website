import express from "express";
import Challenge from "../models/Challenge.js";

const router = express.Router();

/*  
==========================================================
 FAST PAGINATED CHALLENGES ENDPOINT (INFINITE SCROLL READY)
==========================================================
*/

router.get("/challenges", async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = 12;
    const skip = (page - 1) * limit;

    const filter = { isActive: true };

    const projection =
      "challengeType accountSize price priceUpfront evaluationProfitTarget verificationProfitTarget maxDrawdown timeLimitDays minTradingDays isNewsTradingAllowed profitSplit description shortDescription";

    const [total, challenges] = await Promise.all([
      Challenge.countDocuments(filter),
      Challenge.find(filter)
        .sort({ accountSize: 1 })
        .select(projection)
        .skip(skip)
        .limit(limit)
        .lean(),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / limit));

    res.json({
      success: true,
      data: challenges,
      meta: { total, page, limit, totalPages },
    });
  } catch (error) {
    console.error("Challenges fetch error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching challenges" });
  }
});

export default router;
