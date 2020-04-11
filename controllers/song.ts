import Utils from "../utils";
import { Router } from "express";

class SongController {
  public router: Router;
  public constructor() {
    this.router = Router();
    this.addRoutes();
  }

  private addRoutes() {
    this.router.get("/:query", Utils.getSongs);
    this.router.post("/analysis", Utils.getLyrics, Utils.getAnalysis);
  }
}

export default new SongController().router;
