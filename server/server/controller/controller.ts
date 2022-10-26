import http, { IncomingMessage, ServerResponse } from "http";
import fs from "fs";
import path from "path";
import { getPostData } from "../utils/utils";
const Information = require("../model/model");

let pathh = path.join(__dirname, '..', '/','..','/', 'server/data/database.json');

path.resolve(pathh)

const getInfos = (req: IncomingMessage, res: ServerResponse) => {
  if(!fs.existsSync(pathh)){
    fs.writeFile(pathh, JSON.stringify([]), (err) => {
      if(err) throw err;
      console.log('database created');
    })
  }

  fs.readFile(path.resolve(pathh),
    "utf8",(err, data) => {
      // let info,s = JSON.parse(data);
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({success: false, error: err, })
        );
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({success: true, message: JSON.parse(data),})
        );
      }
    }
  );
};

const getInfo = async (req: IncomingMessage, res: ServerResponse, id: number) => {
  try {
    const information = await Information.findById(id);

    if (!information) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Information not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(information));
    }
  } catch (error) {
    console.log(error);
  }
};

let created_at: Date = new Date();
let updated_at: Date = new Date();

const addInfo = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const body: any = await getPostData(req, res);

    const {
      organization,
      createdAt,
      updatedAt,
      products,
      marketValue,
      address,
      ceo,
      country,
      noOfEmployees,
      employees,
    } = JSON.parse(body);

    // created_at.toISOString();
    // updated_at.toISOString();
  
    const information = {
      organization,
      createdAt: created_at.toISOString(),
      updatedAt: updated_at.toISOString(),
      products,
      marketValue,
      address,
      ceo,
      country,
      noOfEmployees,
      employees,
    };

    const newInformation = await Information.create(information);
    res.writeHead(200, { "Content-Type": "application/json" });
    // console.log("bug 2");
    
    return res.end(JSON.stringify(newInformation));
  } catch (error) {
    console.log(error);
  }
};

const updateInfo = async (
  req: IncomingMessage, res: ServerResponse, id: number) => {
  try {
    const information = await Information.findById(id);

    if (!information) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Information not found " }));
    } else {
      const body: any = await getPostData(req, res);

      const {
        organization,
        createdAt,
        updatedAt,
        products,
        marketValue,
        address,
        ceo,
        country,
        noOfEmployees,
        employees,
      } = JSON.parse(body);

      const informationData = {
        organization: organization || information.organization,
        createdAt: information.createdAt,
        updatedAt: updated_at.toISOString() || information.updatedAt,
        products: products || information.products,
        marketValue: marketValue || information.marketValue,
        address: address || information.address,
        ceo: ceo || information.ceo,
        country: country || information.country,
        noOfEmployees: noOfEmployees || information.noOfEmployees,
        employees: employees || information.employees,
      };

      const updInformation = await Information.update(id, informationData);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updInformation));
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteInfo = async (
  req: IncomingMessage, res: ServerResponse,id: number) => {
  try {
    const information = await Information.findById(id);

    if (!information) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Information not found" }));
    } else {
      await Information.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Information ${id} removed` }));
    }
  } catch (error) {
    console.log(error);
  }
};

export { addInfo, getInfos, updateInfo, deleteInfo, getInfo };
