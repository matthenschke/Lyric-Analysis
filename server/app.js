const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

// Access Body Data
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up IBM-Watson
const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

const nlu = new NaturalLanguageUnderstandingV1({
  authenticator: new IamAuthenticator({
    apikey: "mJuagn0o6LJRHjlyTG11tNrFf5ArtNCrb6SEcOkKCTW7"
  }),
  version: "2018-04-05",
  url: "https://gateway.watsonplatform.net/natural-language-understanding/api/"
});

// set up web-scraper tools
const axios = require("axios");
const cheerio = require("cheerio");
const url = "https://genius.com/Beyonce-drunk-in-love-lyrics";

// set up genius api
const api = require("genius-api");
const genius = new api(
  "-pFUR7fD5qinmFKVKmq_IXi0TXT9N51yx81hVEmz35DvXrErRCsDWpy1XNWHJyXv"
);

app.get('/songs/:query', (req,res) => {
  let query = req.params.query;
  genius.search(query).then(function(response) {
    res.json({"hits" : response.hits});
  });
});

app.get("/", (req, res) => {
  axios
    .get(url)
    .then(response => {
      const data = response.data;
      const $ = cheerio.load(data);
      let lyrics = $(".lyrics").text();
      lyrics = lyrics.replace(/ *\[[^\]]*]/g, "").trim();
    })
    .catch(err => {
      console.log(err);
      res.json({ error: err });
    });
});

app.post("/", (req, res) => {
  console.log(req.body.text);
  nlu
    .analyze({
      text: req.body.text,
      features: {
        sentiment: {},
        concepts: {},
        keywords: {},
        emotion: {}
      }
    })
    .then(response => {
      const output = JSON.stringify(response.result, null, 5);
      console.log(output);
      res.json(output);
    })
    .catch(err => {
      console.log("error: ", err);
    });
});

app.listen(PORT, () => {
  console.log("App is listening on PORT: ", PORT);
});
