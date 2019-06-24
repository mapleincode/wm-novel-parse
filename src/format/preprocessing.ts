type pretype = string | string[];

export default function preprocessing(strs: string[]) {
    const results: pretype[] = [];
    for (const str of strs) {
        if (str.length > 30) {
            results.push(str);
            continue;
        }
        const endChar = str[str.length - 1];
        if (endChar === '。' || endChar === '”') {
            results.push(str);
            continue;
        }

        if (/第.{1,5}卷/.test(str) || /第.{1,5}章/.test(str)) {
            const subTitles = str
                .replace('章: ', '章 ')
                .replace('卷: ', '卷 ')
                .replace('章：', '章 ')
                .replace('卷：', '卷 ')
                .replace(/第.{1,5}章/g, ' $& ').replace(/第.{1,5}卷/g, ' $& ').replace(/[\t　]/g, ' ').split(' ').filter(h => h);
            const subs: string[] = [];
            for (const sub of subTitles) {
                if (subs.indexOf(sub) < 0) {
                    subs.push(sub);
                }
            }
            results.push(subs);
            continue;
        }

        results.push(str);
    }
    return results;
}
