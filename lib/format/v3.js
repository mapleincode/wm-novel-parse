"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const preprocessing_1 = __importDefault(require("./preprocessing"));
const chapter_1 = require("../chapter");
const utils_1 = require("../utils");
// 3. {第一卷} {卷title} {第一章} {title}
function formatV3(strs) {
    const results = preprocessing_1.default(strs);
    const fillList = [];
    const chapterOptions = {
        title: '序',
        volumeStatus: true,
        volumeNumber: 0,
        chapterNumber: 0
    };
    let chapter = new chapter_1.Chapter(chapterOptions);
    let oldVolumeNumer = 0;
    let oldVolumeTitle = '';
    for (let i = 0; i < results.length; i++) {
        const item = results[i];
        if (typeof item !== 'string') {
            const originalStr = item.join(' ');
            let volumeNumber = 0;
            let chapterNumber;
            let title = '';
            let volumeTitle = '';
            // 处理卷
            const first = item.shift();
            const volumeTitleTmp = [];
            const titleTmp = [];
            let stauts = true;
            if (utils_1.isCapter(first)) {
                volumeNumber = oldVolumeNumer;
                chapterNumber = utils_1.parseNumber(first.slice(1, -1));
                title = item.join(' ');
                volumeTitle = oldVolumeTitle;
            }
            else if (utils_1.isVolume(first)) {
                volumeNumber = utils_1.parseNumber(first.slice(1, -1));
                oldVolumeNumer = volumeNumber;
                for (const s of item) {
                    if (utils_1.isCapter(s)) {
                        chapterNumber = utils_1.parseNumber(s.slice(1, -1));
                        stauts = false;
                        continue;
                    }
                    if (stauts) {
                        volumeTitleTmp.push(s);
                    }
                    else {
                        titleTmp.push(s);
                    }
                }
                volumeTitle = volumeTitleTmp.join(' ') || oldVolumeTitle;
                oldVolumeTitle = volumeTitle;
                title = titleTmp.join(' ');
            }
            if (!volumeTitle || chapterNumber === undefined) {
                chapter.push(originalStr);
                continue;
            }
            const chapterOptions = {
                title: title,
                volumeStatus: true,
                volumeNumber: volumeNumber,
                chapterNumber: chapterNumber,
                volumeTitle: volumeTitle
            };
            if (chapter.sentences.length) {
                fillList.push(chapter);
            }
            chapter = new chapter_1.Chapter(chapterOptions);
            continue;
        }
        if (typeof item === 'string') {
            chapter.push(item);
            continue;
        }
    }
    fillList.push(chapter);
    return fillList;
}
exports.default = formatV3;
