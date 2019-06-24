import preprocessing from './preprocessing';
import { Chapter, ChapterOptions } from '../chapter';
import { parseNumber, isCapter, isVolume } from '../utils';

// 3. {第一卷} {卷title} {第一章} {title}
export default function formatV3(strs: string[]): Chapter[] {
    const results = preprocessing(strs);
    const fillList: Chapter[] = [];

    const chapterOptions: ChapterOptions = {
        title: '序',
        volumeStatus: true,
        volumeNumber: 0,
        chapterNumber: 0
    };
    let chapter = new Chapter(chapterOptions);

    let oldVolumeNumer = 0;
    let oldVolumeTitle = '';

    for (let i = 0; i < results.length; i++) {
        const item = results[i];
        if (typeof item !== 'string') {
            const originalStr = item.join(' ');
            let volumeNumber = 0;
            let chapterNumber;
            let title = '';
            let volumeTitle = '';

            // 处理卷
            const first = item.shift() as string;
            const volumeTitleTmp = [];
            const titleTmp = [];
            let stauts = true;

            if(isCapter(first)) {
                volumeNumber = oldVolumeNumer;
                chapterNumber = parseNumber(first.slice(1, -1));
                title = item.join(' ');
                volumeTitle = oldVolumeTitle;
            } else if(isVolume(first)) {
                volumeNumber = parseNumber(first.slice(1, -1));
                oldVolumeNumer = volumeNumber;
                for (const s of item) {
                    if (isCapter(s)) {
                        chapterNumber = parseNumber(s.slice(1, -1));
                        stauts = false;
                        continue;
                    }
                    if (stauts) {
                        volumeTitleTmp.push(s);
                    } else {
                        titleTmp.push(s);
                    }
                }
                volumeTitle = volumeTitleTmp.join(' ') || oldVolumeTitle;
                oldVolumeTitle = volumeTitle;
                title = titleTmp.join(' ');
            }

            if(!volumeTitle || chapterNumber === undefined) {
                chapter.push(originalStr);
                continue;
            }

            const chapterOptions: ChapterOptions = {
                title: title,
                volumeStatus: true,
                volumeNumber: volumeNumber,
                chapterNumber: chapterNumber,
                volumeTitle: volumeTitle
            };
            if(chapter.sentences.length) {
                fillList.push(chapter);
            }
            chapter = new Chapter(chapterOptions);
            continue;
        }
        if (typeof item === 'string') {
            chapter.push(item);
            continue;
        }
    }
    fillList.push(chapter);
    return fillList;
}