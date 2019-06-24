"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chapter_1 = require("./chapter");
const utils_1 = require("./utils");
function done(str, options) {
    const paragraphs = utils_1.split(str);
    const items = chapter_1.formatChapter(paragraphs);
    for (const item of items) {
        console.log(item.fullTitle);
    }
}
exports.default = done;