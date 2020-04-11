import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import axios from "axios";
import NaturalLanguageUnderstandingV1 from "ibm-watson/natural-language-understanding/v1";
import { IamAuthenticator } from "ibm-watson/auth";
import cheerio from "cheerio";
import geniusAPI from "genius-api";

dotenv.config();
const nlu = new NaturalLanguageUnderstandingV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.NLU_API_KEY!,
  }),
  version: "2018-04-05",
  url: "https://gateway.watsonplatform.net/natural-language-understanding/api/",
});

const genius = new geniusAPI(process.env.GENIUS_API_KEY);

interface CustomRequest extends Request {
  [key: string]: any;
}
class Utils {
  public getLyrics(req: CustomRequest, res: Response, next: NextFunction) {
    axios
      .get(req.body.url)
      .then(({ data }) => {
        const $: CheerioStatic = cheerio.load(data);
        let lyrics: string = $(".lyrics").text();
        lyrics = lyrics.replace(/ *\[[^\]]*]/g, "").trim();
        req.lyrics = lyrics;
        next();
      })
      .catch((err) => {
        res.json(err);
      });
  }

  public getSongs(req: CustomRequest, res: Response, next: NextFunction) {
    let query = req.params.query;
    genius
      .search(query)
      .then(function ({ hits }: { hits: string }) {
        res.json({ hits });
      })
      .catch((err: any) => console.log(err));
  }

  public getAnalysis(req: CustomRequest, res: Response) {
    nlu
      .analyze({
        text: req.lyrics,
        features: {
          sentiment: {},
          concepts: {},
          keywords: {},
          emotion: {},
        },
      })
      .then(({ result }) => {
        const output = JSON.stringify(result, null, 5);
        res.json({ lyrics: req.lyrics, analysis: output });
      })
      .catch((err) => {
        res.json(err);
      });
  }
}

export default new Utils();
