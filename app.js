const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const path = require("path");

// get env variables
require("dotenv").config();

// Access Body Data
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up IBM-Watson
const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

const nlu = new NaturalLanguageUnderstandingV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.NLU_API_KEY
  }),
  version: "2018-04-05",
  url: "https://gateway.watsonplatform.net/natural-language-understanding/api/"
});

// set up web-scraper tools
const axios = require("axios");
const cheerio = require("cheerio");

// set up genius api
const api = require("genius-api");
const genius = new api(process.env.GENIUS_API_KEY);

// middleware
const getLyrics = (req, res, next) => {
  axios
    .get(req.body.url)
    .then(response => {
      const data = response.data;
      const $ = cheerio.load(data);
      let lyrics = $(".lyrics").text();
      lyrics = lyrics.replace(/ *\[[^\]]*]/g, "").trim();
      req.lyrics = lyrics;
      next();
    })
    .catch(err => {
      console.log(err);
      res.json({ error: err });
    });
};

app.get("/songs/:query", (req, res) => {
  let query = req.params.query;
  genius
    .search(query)
    .then(function(response) {
      res.json({ hits: response.hits });
    })
    .catch(err => console.log(err));
});

app.post("/", getLyrics, (req, res) => {
  console.log(req.lyrics);
  nlu
    .analyze({
      text: req.lyrics,
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
      res.json({ lyrics: req.lyrics, analysis: output });
    })
    .catch(err => {
      console.log("error: ", err);
    });
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static("client/build"));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.use(express.static(path.join(__dirname, "/client/public")));
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
  });
}

app.listen(PORT, () => {
  console.log("App is listening on PORT: ", PORT);
});
