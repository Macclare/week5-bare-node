import path from "path";
import { writeDataToFile, getFileData } from "../utils/utils";
import { Info } from "../interface/Company";


let informations: [Info];

informations = getFileData(path.resolve(__dirname, "../data/database.json"));

let id = informations.length

const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(informations);
  });
};

const findById = (id: number) => {
  return new Promise((resolve, reject) => {
    const information = informations.find((info: Info) => info.id === id);
    resolve(information);
  });
};

const create = (information: any) => {
  return new Promise((resolve, reject) => {
  const newInfo = { 
      id: id+=1, 
      ...information 
    };
  informations.push(newInfo);
    writeDataToFile(
      path.resolve(__dirname, "../data/database.json"),
      informations
    );
    resolve(newInfo);
  });
};

const update = (id: number, informationsData:  Info) => {
  return new Promise((resolve, reject) => {
    const index = informations.findIndex((i) => i.id === id);
    // const id: string = uuidv4()
    informations[index] = { id, ...informationsData };
    writeDataToFile(
      path.resolve(__dirname, "../data/database.json"),
      informations
    );
    resolve(informations[index]);
  });
};

const remove = (id: any) => {
  return new Promise<void>((resolve, reject) => {
    const index = informations.findIndex((i) => i.id === id);
    informations.splice(index, 1);
    writeDataToFile(
      path.resolve(__dirname, "../data/database.json"),
      informations
    );
    resolve();
  });
};

export { findAll, findById, create, update, remove };
