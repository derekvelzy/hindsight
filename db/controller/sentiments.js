const Twitter = require('twitter-lite');
const language = require('@google-cloud/language');
const keys = require('./keys.js');
const languageClient = new language.LanguageServiceClient();

async function getSentiment(text) {
  const document = {
      content: text,
      type: 'PLAIN_TEXT',
  };
  const [result] = await languageClient.analyzeSentiment({document: document});
  const sentiment = result.documentSentiment;
  return sentiment.score;
};

module.exports = {
  twitter: async (req, res) => {
    console.log('carne asada', req.params);

    const user = new Twitter({
      consumer_key: keys.consumer_key,
      consumer_secret: keys.consumer_secret,
    });

    try {
      const app = new Twitter({
          bearer_token: keys.bearer_token,
      });
      response = await app.get(`/search/tweets`, {
          q: req.params.ticker,
          lang: "en",
          count: 10,
      });
      let stringed = "";
      for (tweet of response.statuses) {
        stringed += tweet.text + "\n";
      }
      const score = await getSentiment(stringed);
      console.log(score);
      res.send(score.toString());
    } catch (e) {
      console.dir(e);
      res.sendStatus(400);
    }
  },

  polygon: async (req, res) => {
    const score = await getSentiment(req.body.articles);
    console.log(score);
    res.send(score.toString());
  }
}