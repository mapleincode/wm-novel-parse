"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const preprocessing_1 = __importDefault(require("./preprocessing"));
const chapter_1 = require("../chapter");
const utils_1 = require("../utils");
;
// 2. {第一章} {title}
function formatV2(strs, options) {
    const results = preprocessing_1.default(strs); // 预处理
    const fillList = [];
    const chapterOptions = {
        title: '序',
        volumeNumber: 0,
        chapterNumber: 0,
        volumeStatus: false,
        strictMode: options ? options.strictMode : true
    };
    let chapter = new chapter_1.Chapter(chapterOptions);
    for (let i = 0; i < results.length; i++) {
        const item = results[i]; // 提取一行
        if (typeof item === 'string') {
            chapter.push(item);
            continue;
        }
        const first = item.shift();
        if (!utils_1.isCapter(first)) { // 检查是否真的是章节
            item.unshift(first);
            chapter.push(item.join(' '));
        }
        let chapterNumber = 0;
        try {
            chapterNumber = utils_1.parseNumber(first.slice(1, -1));
        }
        catch (err) {
            if (options && options.strictMode === false) {
                item.unshift(first);
                if (options.strictMode) {
                    console.error(err.message);
                }
            }
            else {
                throw err;
            }
        }
        const title = item.join(' ');
        if (chapter.sentences.length) {
            fillList.push(chapter);
        }
        const chapterOptions = {
            title: title,
            chapterNumber: chapterNumber,
            volumeStatus: false,
            strictMode: options ? options.strictMode : true
        };
        chapter = new chapter_1.Chapter(chapterOptions);
    }
    fillList.push(chapter);
    return fillList;
}
exports.default = formatV2;
