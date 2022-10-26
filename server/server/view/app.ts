import http, { IncomingMessage, Server, ServerResponse } from "http";
import fs from 'fs';
import path from 'path';

import {
  getInfos,
  getInfo,
  addInfo,
  updateInfo,
  deleteInfo,
} from "../controller/controller";
/*
implement your server code here
*/

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET" && req.url === "/") {
      
      return getInfos(req, res);
    } 
    else if (req.url?.match(/\/([0-9a-z-]+)/) && req.method === "GET") {
      console.log(req)
      const id: number = parseInt(req.url.split("/")[1]);
      return getInfo(req, res, id);
    } 
    else if (req.method === "POST" && req.url === "/") {
      return addInfo(req, res);
    } 
    else if (req.method === "PUT" && req.url?.match(/\/([0-9a-z-]+)/)) {
      const id: number = Number(req.url.split("/")[1]);
      return updateInfo(req, res, id);
    } 
    else if (req.method === "DELETE" && req.url?.match(/\/([0-9a-z-]+)/)) {
      const id: number = Number(req.url.split("/")[1]);
      return deleteInfo(req, res, id);
    } 
    else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route not Found" }));
    }
    console.log(req.url);
   }
);

const PORT = 3010;

server.listen(PORT, () => `Server is running on port ${PORT}`);