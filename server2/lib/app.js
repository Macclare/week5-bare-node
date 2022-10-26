"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const controllers_1 = require("./controllers");
/*
implement your server code here
*/
let url = "https://www.youtube.com/watch?v=eSzNNYk7nVU";
const server = http_1.default.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
        return controllers_1.getResult(req, res, url);
    }
});
const PORT = 3100;
server.listen(PORT, () => `Server is running on port ${PORT}`);
