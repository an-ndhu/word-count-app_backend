const Insights = require("../models/insights");
const urlToKeyWords = require("../utils/urlToKeyWords");
exports.addInsight = async (req, res) => {
  try {
    console.log(req.body);
    var url = req.body.url;
    if (req.body.url.endsWith("/")) {
      url = url.slice(0, -1);
    }
    console.log(url);

    const data = await urlToKeyWords(req.body.url);

    if (req.body.userId) {
      const isUserAndUrl = await Insights.findOne({
        userId: req.body.userId,
        url,
      });
      if (isUserAndUrl) {
        console.log(isUserAndUrl);
        isUserAndUrl.wordsLength = data.wordsArrayLength;
        isUserAndUrl.keywordArray = data.keywordArray;
        isUserAndUrl.save();
      } else {
        const newData = {
          userId: req.body.userId,
          url,
          wordsLength: data.wordsArrayLength,
          keywordArray: data.keywordArray,
          favourite: false,
        };
        const insightData = await Insights.create(newData);
      }
    }
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "cant get",
    });
  }
};
exports.getInsightsWithEmailId = async (req, res) => {
  try {
    const insightData = await Insights.find({ userId: req.query.emailId }).sort(
      { _id: -1 }
    );
    res.status(200).json({
      success: true,
      insightData,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Cant get with emailIds",
    });
  }
};
exports.getInsightById = async (req, res) => {
  try {
    const insightData = await Insights.findById({ _id: req.query.id });
    res.status(200).json({
      success: true,
      insightData,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Cant get detailed Insight",
    });
  }
};
exports.deleteInsight = async (req, res) => {
  try {
    const deletedData = await Insights.deleteOne({ _id: req.query.id });
    res.status(200).json({
      success: true,
      message: "Deleted",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Cant delete",
    });
  }
};
exports.addToFavourite = async (req, res) => {
  try {
    const insightData = await Insights.findOne({ _id: req.query.id });
    insightData.favourite = true;
    insightData.save();
    res.status(200).json({
      success: true,
      message: "Updated",
    });
  } catch (error) {
    res.status(401).json({
      success: true,
      message: "Cant update",
    });
  }
};
exports.removeFromFavourite = async (req, res) => {
  try {
    const insightData = await Insights.findOne({ _id: req.query.id });
    insightData.favourite = false;
    insightData.save();
    res.status(200).json({
      success: true,
      message: "Updated",
    });
  } catch (error) {
    res.status(401).json({
      success: true,
      message: "Cant update",
    });
  }
};
