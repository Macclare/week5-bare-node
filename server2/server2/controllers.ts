import { IncomingMessage, ServerResponse } from "http";
import { parser } from "html-metadata-parser";
import { Data } from "./IData";

const getResult = async (
  req: IncomingMessage,
  res: ServerResponse,
  url: string
) => {
  let obj: Data = {
    title: "",
    description: "",
    image: ""
  };
  // The title, description and image URL's on that webpage.
  await parser(url).then((result) => {
   const { meta } = result;
   const { og } = result

   obj["title"] = meta.title
   obj["description"] = meta.description
   obj["image"] = og.image

   console.log(obj);

   res.end(JSON.stringify(obj, null, 2))
  });

};

export { getResult };
