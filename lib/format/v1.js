"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const preprocessing_1 = __importDefault(require("./preprocessing"));
const chapter_1 = require("../chapter");
const utils_1 = require("../utils");
// {第一卷} {第一章} {title}
function formatV1(strs) {
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
    for (let i = 0; i < results.length; i++) {
        const item = results[i];
        if (typeof item !== 'string') {
            const originStr = item.join(' ');
            let volumeNumber = 0;
            let chapterNumber;
            let title = '';
            const first = item.shift();
            let zj;
            if (utils_1.isCapter(first)) {
                volumeNumber = oldVolumeNumber;
                zj = first;
                title = item.join(' ');
            }
            else if (utils_1.isVolume(first)) {
                const second = item.shift();
                volumeNumber = utils_1.parseNumber(first.slice(1, -1));
                chapterNumber = utils_1.parseNumber(second.slice(1, -1));
                title = item.join('');
            }
            if (chapterNumber === undefined) {
                chapter.push(originStr);
                continue;
            }
            if (chapter.sentences.length) {
                fillList.push(chapter);
            }
            const chapterOptions = {
                title: title,
                volumeStatus: true,
                volumeNumber: volumeNumber,
                chapterNumber: chapterNumber,
                volumeTitle: ''
            };
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
exports.default = formatV1;
