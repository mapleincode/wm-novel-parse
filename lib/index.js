"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chapter_1 = require("./chapter");
const utils_1 = require("./utils");
const ParseOptions_1 = __importDefault(require("./ParseOptions"));
;
function done(str, options) {
    options = options || {};
    const _options = new ParseOptions_1.default(options.autoIncrement, options.strictMode);
    const paragraphs = utils_1.split(str);
    const items = chapter_1.formatChapter(paragraphs, _options);
    return items;
}
exports.default = done;
