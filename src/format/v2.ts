import preprocessing from './preprocessing';
import { Chapter, ChapterOptions } from '../chapter';
import { parseNumber, isCapter } from '../utils';

// 2. {第一章} {title}
export default function formatV2(strs: string[]) {
    const results = preprocessing(strs);
    const fillList: Chapter[] = [];

    const chapterOptions: ChapterOptions = {
        title: '序',
        volumeNumber: 0,
        chapterNumber: 0,
        volumeStatus: false
    };

    let chapter = new Chapter(chapterOptions);
    for (let i = 0; i < results.length; i++) {
        const item = results[i];

        if(typeof item === 'string') {
            chapter.push(item);
            continue;
        }

        const first = item.shift() as string;
        if (!isCapter(first)) {
            chapter.push(item.join(' '));
        }
        const chapterNumber = parseNumber(first.slice(1, -1));
        const title = item.join(' ');
        if(chapter.sentences.length) {
            fillList.push(chapter);
        }

        const chapterOptions: ChapterOptions = {
            title: title,
            chapterNumber: chapterNumber,
            volumeStatus: false
        };
        chapter = new Chapter(chapterOptions);
    }

    fillList.push(chapter);

    return fillList;
}