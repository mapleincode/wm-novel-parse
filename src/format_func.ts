import { Chapter } from './chapter';
import formatV1 from './format/v1';
import formatV2 from './format/v2';
import formatV3 from './format/v3';
import formatV4 from './format/v4';

interface ParseOptions {
    autoIncrement?: boolean; // 是否自增章节
    strictMode?: boolean; // 是否需要 title 符合格式
};

interface FormatType {
    (str: string[], options?: ParseOptions): Chapter[];
}
// 1. {第一卷} {第一章} {title}
// 2. {第一章} {title}
// 3. {第一卷} {卷title} {第一章} {title}
// 4. {卷title} {第一章} {title}

export default function getFormatFunc(headTitle: string): FormatType {
    headTitle = headTitle
        .replace('章: ', '章 ')
        .replace('卷: ', '卷 ')
        .replace('章：', '章 ')
        .replace('卷：', '卷 ')
        .replace(/第.{1,5}章/g, ' $& ').replace(/第.{1,5}卷/g, ' $& ').replace(/[\t　]/g, ' ');
            
    const subTitles = headTitle.split(' ').filter(h => h);
    const results: string[] = [];
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
            return formatV1;
        } else {
            return formatV3;
        }
    }


    if (first[0] === '第' && first[first.length - 1] === '章') {
        return formatV2;
    }
    // 检查章
    for (const sub of results) {
        if (sub[0] === '第' && sub[sub.length - 1] === '章') {
            return formatV4;
        }
    }

    throw new Error(`${subTitles.join(' ')} 无法被解析`);
}