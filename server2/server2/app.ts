import http, { IncomingMessage, Server, ServerResponse } from "http";
import cheerio, { CheerioAPI } from "cheerio";
import { getResult } from "./controllers"

/*
implement your server code here
*/
let url = "https://www.youtube.com/watch?v=eSzNNYk7nVU";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET" && req.url === "/") {
      return getResult(req, res, url)
    }
  }
);

const PORT = 3100;

server.listen(PORT, () => `Server is running on port ${PORT}`);