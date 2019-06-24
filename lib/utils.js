"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const china_number_parse_1 = __importDefault(require("./china_number_parse"));
function split(str) {
    return str.split('\n').map(str => str.trim()).filter(s => !!s);
}
exports.split = split;
function parseNumber(num) {
    if (/^[0123456789]+$/.test(num)) {
        return parseInt(num);
    }
    if (/^[一二三四五六七八九十零百千万]+$/.test(num)) {
        return china_number_parse_1.default(num);
    }
    throw new Error(`${num} 数字非法格式`);
}
exports.parseNumber = parseNumber;
function isCapter(str) {
    return /^第.{1,5}章$/.test(str);
}
exports.isCapter = isCapter;
function isVolume(str) {
    return /^第.{1,5}卷$/.test(str);
}
exports.isVolume = isVolume;
