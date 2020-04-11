import express, { Application, Request, Response } from "express";
import bodyparser from "body-parser";
import path from "path";
import SongController from "./controllers/song";

export class App {
  private app: Application;
  private port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8000;
    this.initializeMiddleware();
    this.initializeControllers();
    this.initializeClientRoutes();
    this.listen();
  }

  private initializeMiddleware(): void {
    this.app.use(bodyparser.json());
    this.app.use(bodyparser.urlencoded({ extended: true }));
  }

  private initializeControllers(): void {
    this.app.use("/song", SongController);
  }

  private initializeClientRoutes(): void {
    if (process.env.NODE_ENV === "production") {
      // Serve any static files
      this.app.use(express.static("client/build"));
      // Handle React routing, return all requests to React app
      this.app.get("*", function (req: Request, res: Response) {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
      });
    } else {
      this.app.use(express.static(path.join(__dirname, "/client/public")));
      this.app.get("/*", function (req: Request, res: Response) {
        res.sendFile(path.join(__dirname, "./client/public/index.html"));
      });
    }
  }

  private listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on Port: ${this.port}`);
    });
  }
}

new App();
