import chinaNumberParse from './china_number_parse';
export function split(str: string): string[] {
    return str.split('\n').map(str => str.trim()).filter(s => !!s);
}

export function parseNumber(num: string): number {
    if(/^[0123456789]+$/.test(num)) {
        return parseInt(num);
    }
    if(/^[一二三四五六七八九十零百千万]+$/.test(num)) {
        return chinaNumberParse(num);
    }
    throw new Error(`${num} 数字非法格式`);
}

export function isCapter(str: string) {
    return /^第.{1,5}章$/.test(str);
}

export function isVolume(str: string) {
    return /^第.{1,5}卷$/.test(str);
}