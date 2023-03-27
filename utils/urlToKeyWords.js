const request = require("request");
const cheerio = require("cheerio");

const urlToKeyWords = async (url) => {
  //   console.log("here");
  return new Promise((resolve, reject) => {
    request(url, async function (error, response, html) {
      if (error) {
        reject(error);
        return;
      }
      const loadedContent = await cheerio.load(html);
      const textContent = await loadedContent("body").text();
      const replacedTextContent = await textContent.replace(/[^\w\s]/gi, "");
      const wordsArray = await replacedTextContent.split(/\s+/);
      const keywordCount = {};
      for (let i = 0; i < wordsArray.length; i++) {
        const keyword = wordsArray[i];
        if (keyword in keywordCount) {
          keywordCount[keyword]++;
        } else {
          keywordCount[keyword] = 1;
        }
      }
      const keywordArray = Object.entries(keywordCount).map(
        ([keyword, count]) => ({ keyword, count })
      );
      await keywordArray.sort((a, b) => b.count - a.count);
      const data = {
        wordsArrayLength: wordsArray.length,
        keywordArray,
      };
      resolve(data);
    });
  });
};
module.exports = urlToKeyWords;
