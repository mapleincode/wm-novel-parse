import preprocessing from './preprocessing';
import { Chapter, ChapterOptions } from '../chapter';
import { parseNumber, isCapter } from '../utils';

interface ParseOptions {
    autoIncrement?: boolean; // 是否自增章节
    strictMode?: boolean; // 是否需要 title 符合格式
};

// 2. {第一章} {title}
export default function formatV2(strs: string[], options?: ParseOptions) {
    const results = preprocessing(strs); // 预处理
    const fillList: Chapter[] = [];

    const chapterOptions: ChapterOptions = {
        title: '序',
        volumeNumber: 0,
        chapterNumber: 0,
        volumeStatus: false,
        strictMode: options ? options.strictMode : true
    };

    let chapter = new Chapter(chapterOptions);
    for (let i = 0; i < results.length; i++) {
        const item = results[i]; // 提取一行

        if(typeof item === 'string') {
            chapter.push(item);
            continue;
        }

        const first = item.shift() as string;

        if (!isCapter(first)) { // 检查是否真的是章节
            item.unshift(first);
            chapter.push(item.join(' '));
        }
        let chapterNumber = 0;

        try {
            chapterNumber = parseNumber(first.slice(1, -1));
        } catch(err) {
            if (options && options.strictMode === false) {
                item.unshift(first);
                if (options.strictMode) {
                    console.error(err.message);
                }
            } else {
                throw err;
            }
        }

        const title = item.join(' ');
        if(chapter.sentences.length) {
            fillList.push(chapter);
        }

        const chapterOptions: ChapterOptions = {
            title: title,
            chapterNumber: chapterNumber,
            volumeStatus: false,
            strictMode: options ? options.strictMode : true
        };
        chapter = new Chapter(chapterOptions);
    }

    fillList.push(chapter);

    return fillList;
}