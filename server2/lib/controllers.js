"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResult = void 0;
const html_metadata_parser_1 = require("html-metadata-parser");
const getResult = async (req, res, url) => {
    let obj = {
        title: "",
        description: "",
        image: ""
    };
    // The title, description and image URL's on that webpage.
    await html_metadata_parser_1.parser(url).then((result) => {
        const { meta } = result;
        const { og } = result;
        obj["title"] = meta.title;
        obj["description"] = meta.description;
        obj["image"] = og.image;
        console.log(obj);
        res.end(JSON.stringify(obj, null, 2));
    });
};
exports.getResult = getResult;
