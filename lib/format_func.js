"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v1_1 = __importDefault(require("./format/v1"));
const v2_1 = __importDefault(require("./format/v2"));
const v3_1 = __importDefault(require("./format/v3"));
const v4_1 = __importDefault(require("./format/v4"));
;
// 1. {第一卷} {第一章} {title}
// 2. {第一章} {title}
// 3. {第一卷} {卷title} {第一章} {title}
// 4. {卷title} {第一章} {title}
function getFormatFunc(headTitle) {
    headTitle = headTitle
        .replace('章: ', '章 ')
        .replace('卷: ', '卷 ')
        .replace('章：', '章 ')
        .replace('卷：', '卷 ')
        .replace(/第.{1,5}章/g, ' $& ').replace(/第.{1,5}卷/g, ' $& ').replace(/[\t　]/g, ' ');
    const subTitles = headTitle.split(' ').filter(h => h);
    const results = [];
    for (const sub of subTitles) {
        if (results.indexOf(sub) < 0) {
            results.push(sub);
        }
    }
    const first = results[0];
    const second = results[1];
    // 检查卷
    if (first[0] === '第' && first[first.length - 1] === '卷') {
        if (second[0] === '第') {
            return v1_1.default;
        }
        else {
            return v3_1.default;
        }
    }
    if (first[0] === '第' && first[first.length - 1] === '章') {
        return v2_1.default;
    }
    // 检查章
    for (const sub of results) {
        if (sub[0] === '第' && sub[sub.length - 1] === '章') {
            return v4_1.default;
        }
    }
    throw new Error(`${subTitles.join(' ')} 无法被解析`);
}
exports.default = getFormatFunc;
