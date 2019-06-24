"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const preprocessing_1 = __importDefault(require("./preprocessing"));
const chapter_1 = require("../chapter");
const utils_1 = require("../utils");
// 4. {卷title} {第一章} {title}
function formatV4(strs) {
    const results = preprocessing_1.default(strs);
    const fillList = [];
    const chapterOptions = {
        title: '序',
        volumeStatus: true,
        volumeNumber: 0,
        chapterNumber: 0
    };
    let chapter = new chapter_1.Chapter(chapterOptions);
    let oldVolumeNumber = 0;
    let oldValumeTitle = '';
    for (const item of results) {
        if (typeof item === 'string') {
            chapter.push(item);
            continue;
        }
        if (typeof item === 'object') {
            const originStr = item.join(' ');
            let zj = '';
            let volumeTmp = [];
            for (const i of item) {
                const str = item.shift();
                if (utils_1.isCapter(str)) {
                    zj = str;
                    break;
                }
                volumeTmp.push(str);
            }
            if (!zj) {
                chapter.push(originStr);
                continue;
            }
            const volumeTitle = volumeTmp.join(' ');
            const title = item.join(' ');
            if (oldValumeTitle !== volumeTitle) {
                oldVolumeNumber++;
                oldValumeTitle = volumeTitle;
            }
            const chapterNumber = utils_1.parseNumber(zj.slice(1, -1));
            const volumeNumber = oldVolumeNumber;
            if (chapter.sentences.length) {
                fillList.push(chapter);
            }
            const options = {
                volumeStatus: true,
                volumeTitle: volumeTitle,
                title: title,
                volumeNumber: volumeNumber,
                chapterNumber: chapterNumber
            };
            chapter = new chapter_1.Chapter(options);
        }
    }
    fillList.push(chapter);
    return fillList;
}
exports.default = formatV4;
