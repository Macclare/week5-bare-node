import fs from "fs";
import { IncomingMessage, ServerResponse } from "http";
import path from 'path'

let pathh = path.join(__dirname, '..', '/','..','/', 'server/data/database.json');
const writeDataToFile = (
    filename: string | fs.PathLike,
    content: unknown[]
  ) => {
    fs.writeFile(pathh, JSON.stringify(content, null, 3), "utf8", (err) => {
      if (err) {
        console.log(err);
      }
    });
  };
  
  const getFileData = (filename: string) => {
    try {
      let infoData = JSON.parse(fs.readFileSync(filename, "utf8"));
      return infoData;
    } catch (error) {
      fs.writeFileSync(pathh, JSON.stringify([]), "utf8");
      const dataStore: string[] = [];
      return dataStore;
    }
  };
  
  const getPostData = (req: IncomingMessage, res: ServerResponse) => {
    return new Promise((resolve, reject) => {
      try {
        let body = "";
  
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
  
        req.on("end", () => {
          resolve(body);
        });
      } catch (error) {
        reject(error);
      }
    });
  };
  
  export { writeDataToFile, getPostData, getFileData };