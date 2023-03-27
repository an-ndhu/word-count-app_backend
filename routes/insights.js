const express = require("express");

const {
  addInsight,
  getInsightsWithEmailId,
  getInsightById,
  deleteInsight,
  addToFavourite,
  removeFromFavourite,
} = require("../controllers/insights");

const router = express.Router();

router.post("/addInsight", addInsight);
router.get("/getInsightswithEmailId", getInsightsWithEmailId);
router.get("/getDetailedInsight", getInsightById);
router.delete("/deleteInsight", deleteInsight);
router.put("/addToFavourite", addToFavourite);
router.put("/removeFromFavourites", removeFromFavourite);

module.exports = router;
