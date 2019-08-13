"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChinaNumber;
(function (ChinaNumber) {
    ChinaNumber["Zero"] = "\u96F6";
    ChinaNumber["One"] = "\u4E00";
    ChinaNumber["Two"] = "\u4E8C";
    ChinaNumber["Three"] = "\u4E09";
    ChinaNumber["Four"] = "\u56DB";
    ChinaNumber["Five"] = "\u4E94";
    ChinaNumber["Six"] = "\u516D";
    ChinaNumber["Seven"] = "\u4E03";
    ChinaNumber["Eight"] = "\u516B";
    ChinaNumber["Nine"] = "\u4E5D";
    ChinaNumber["Ten"] = "\u5341";
    ChinaNumber["Thousand"] = "\u5343";
    ChinaNumber["Hundred"] = "\u767E";
    ChinaNumber["Wan"] = "\u4E07";
})(ChinaNumber || (ChinaNumber = {}));
const ChinaNumberMap = {
    [ChinaNumber.Zero]: 0,
    [ChinaNumber.One]: 1,
    [ChinaNumber.Two]: 2,
    [ChinaNumber.Three]: 3,
    [ChinaNumber.Four]: 4,
    [ChinaNumber.Five]: 5,
    [ChinaNumber.Six]: 6,
    [ChinaNumber.Seven]: 7,
    [ChinaNumber.Eight]: 8,
    [ChinaNumber.Nine]: 9,
    [ChinaNumber.Ten]: 10,
    [ChinaNumber.Thousand]: 1000,
    [ChinaNumber.Hundred]: 100,
    [ChinaNumber.Wan]: 10000
};
function find(str, code) {
    const end = [];
    for (const c of code) {
        const index = str.indexOf(c);
        if (index > -1) {
            end.push({
                index,
                code: c
            });
        }
    }
}
function getChinaNumber(str) {
    const num = str;
    if (!num) {
        throw new Error('非法字符转换');
    }
    return num;
}
function chinaNumberParse(num, value = 0) {
    if (num.length === 0) {
        return value;
    }
    if (num.length === 1) {
        return ChinaNumberMap[num] + value;
    }
    if (num.length === 2 && num[0] === ChinaNumber.Ten) {
        num = `一${num}`;
    }
    const firstNum = getChinaNumber(num[0]);
    if (firstNum === ChinaNumber.Zero) {
        return chinaNumberParse(num.slice(1), value);
    }
    const NextNum = getChinaNumber(num[1]);
    if (num.length > 2 && [ChinaNumber.Hundred, ChinaNumber.Thousand, ChinaNumber.Hundred].indexOf(NextNum) < 0) {
        throw new Error('Next Num 格式错误');
    }
    const resultValue = value + ChinaNumberMap[firstNum] * ChinaNumberMap[NextNum];
    return chinaNumberParse(num.slice(2), resultValue);
}
exports.default = chinaNumberParse;
