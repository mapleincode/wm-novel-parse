"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chapter_1 = require("./chapter");
const utils_1 = require("./utils");
;
function done(str, options) {
    const paragraphs = utils_1.split(str);
    const items = chapter_1.formatChapter(paragraphs, options);
    return items;
}
exports.default = done;
