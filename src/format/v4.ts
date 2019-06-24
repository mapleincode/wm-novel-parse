import preprocessing from './preprocessing';
import { Chapter, ChapterOptions } from '../chapter';
import { parseNumber, isCapter } from '../utils';

// 4. {卷title} {第一章} {title}
export default function formatV4(strs: string[]) {
    const results = preprocessing(strs);
    const fillList: Chapter[] = [];

    const chapterOptions: ChapterOptions = {
        title: '序',
        volumeStatus: true,
        volumeNumber: 0,
        chapterNumber: 0
    };

    let chapter = new Chapter(chapterOptions);
    let oldVolumeNumber = 0;
    let oldValumeTitle = '';

    for (const item of results) {
        if (typeof item === 'string') {
            chapter.push(item);
            continue;
        }

        if (typeof item === 'object') {
            const originStr = item.join(' ');
            let zj = '';

            let volumeTmp = [];

            for (const i of item) {
                const str = item.shift() as string;
                if (isCapter(str)) {
                    zj = str;
                    break;
                }
                volumeTmp.push(str);
            }

            if (!zj) {
                chapter.push(originStr);
                continue;
            }

            const volumeTitle = volumeTmp.join(' ');
            const title = item.join(' ');

            if (oldValumeTitle !== volumeTitle) {
                oldVolumeNumber++;
                oldValumeTitle = volumeTitle;
            }

            const chapterNumber = parseNumber(zj.slice(1, -1));
            const volumeNumber = oldVolumeNumber;

            if(chapter.sentences.length) {
                fillList.push(chapter);
            }
            const options: ChapterOptions = {
                volumeStatus: true,
                volumeTitle: volumeTitle,
                title: title,
                volumeNumber: volumeNumber,
                chapterNumber: chapterNumber
            };
            chapter = new Chapter(options);
        }
    }

    fillList.push(chapter);
    return fillList;
}
