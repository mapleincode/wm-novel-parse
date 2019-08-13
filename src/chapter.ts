import getFormatFunc from './format_func';

export interface ChapterOptions {
    volumeStatus: boolean;
    title: string;
    volumeTitle?: string;
    volumeNumber?: number;
    strictMode?: boolean;
    chapterNumber: number;
}

interface ParseOptions {
    autoIncrement?: boolean; // 是否自增章节
    strictMode?: boolean; // 是否需要 title 符合格式
};

export class Chapter {
    private strs: string[] = [];
    private options: ChapterOptions;

    constructor(options: ChapterOptions, strs?: string[]) {
        if (strs) {
            this.strs = strs.map(str => str.trim());
        }
        this.options = options;
    }

    push(str: string) {
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
        if (this.options.chapterNumber === 0 &&
            this.options.strictMode === false) {
            return this.title;
        }

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
        return `第${num}卷`
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
        return `第${this.options.chapterNumber}章`
    }

    toHtml(className: string = 'novel') {
        return this.strs.map(str => `<p class="${className}">${str}</p>`).join('\n');
    }

    toJSON() {
        return {
            title: this.fullTitle,
            sentences: this.strs
        }
    }
}

type PChapterOptions = Partial<ChapterOptions>;

export function formatChapter(strs: string[], parseOptions?: ParseOptions): Chapter[] {
    const options: PChapterOptions = { volumeStatus: false };
    const titles = ['第一卷', '第1卷', '第一章', '第1章', '第１卷', '第１章'];
    // 检查是否包含卷
    let stop = false;
    let titleStr = '';
    for (const str of strs) {
        if (stop) break;
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

    if(!titleStr) {
        throw new Error('小说结构未包含标题');
    }

    const func = getFormatFunc(titleStr);
    return func(strs, parseOptions);
}