import preprocessing from './preprocessing';
import { Chapter, ChapterOptions } from '../chapter';
import { parseNumber, isCapter, isVolume } from '../utils';

// {第一卷} {第一章} {title}
export default function formatV1(strs: string[]) {
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

    for (let i = 0; i < results.length; i ++) {
        const item = results[i];

        if (typeof item !== 'string') {
            const originStr = item.join(' ');

            let volumeNumber = 0;
            let chapterNumber;
            let title = '';
            
            const first = item.shift() as string;
            let zj;

            if(isCapter(first)) {
                volumeNumber = oldVolumeNumber;
                chapterNumber = parseNumber(first.slice(1, -1));
                zj = first;
                title = item.join(' ');
            } else if(isVolume(first)) {
                const second = item.shift() as string;
                volumeNumber = parseNumber(first.slice(1, -1));
                chapterNumber = parseNumber(second.slice(1, -1));
                title = item.join('');
            }
            if(chapterNumber === undefined) {
                chapter.push(originStr);
                continue;
            }
            if(chapter.sentences.length) {
                fillList.push(chapter);
            }
            const chapterOptions: ChapterOptions = {
                title: title,
                volumeStatus: true,
                volumeNumber: volumeNumber,
                chapterNumber: chapterNumber,
                volumeTitle: ''
            };
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