"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const format_func_1 = __importDefault(require("./format_func"));
;
class Chapter {
    constructor(options, strs) {
        this.strs = [];
        if (strs) {
            this.strs = strs.map(str => str.trim());
        }
        this.options = options;
    }
    push(str) {
        str = str.trim();
        if (str) {
            this.strs.push(str);
        }
    }
    get sentences() {
        return this.strs;
    }
    get title() {
        return this.options.title;
    }
    get fullTitle() {
        const _title = `${this.chapterStr} ${this.title}`;
        if (this.options.volumeStatus) {
            return `${this.fullVolumeTitle} ${_title}`;
        }
        return _title;
    }
    get volumeNumber() {
        return this.options.volumeNumber;
    }
    get volumeStr() {
        let num = this.options.volumeNumber;
        if (typeof num !== 'number') {
            num = 0;
        }
        return `第${num}卷`;
    }
    get volumeTitle() {
        return this.options.volumeTitle || '';
    }
    get fullVolumeTitle() {
        if (this.volumeTitle) {
            return `${this.volumeStr} ${this.volumeTitle}`;
        }
        return this.volumeStr;
    }
    get chapterNumber() {
        return this.options.chapterNumber;
    }
    get chapterStr() {
        return `第${this.options.chapterNumber}章`;
    }
    toHtml(className = 'novel') {
        return this.strs.map(str => `<p class="${className}">${str}</p>`).join('\n');
    }
    toJSON() {
        return {
            title: this.fullTitle,
            sentences: this.strs
        };
    }
}
exports.Chapter = Chapter;
function formatChapter(strs, parseOptions) {
    const options = { volumeStatus: false };
    const titles = ['第一卷', '第1卷', '第一章', '第1章'];
    // 检查是否包含卷
    let stop = false;
    let titleStr = '';
    for (const str of strs) {
        if (stop)
            break;
        for (const _t of titles) {
            const index = str.indexOf(_t);
            if (index > -1) {
                if (titles.indexOf(_t) < 2) {
                    options.volumeStatus = true;
                }
                titleStr = str;
                stop = true;
                break;
            }
        }
    }
    if (!titleStr) {
        throw new Error('小说结构未包含标题');
    }
    const func = format_func_1.default(titleStr);
    return func(strs, parseOptions);
}
exports.formatChapter = formatChapter;
