import { formatChapter } from './chapter';
import { split } from './utils';

export default function done(str: string, options?: object) {
    const paragraphs = split(str);
    const items = formatChapter(paragraphs);
    return items;
}
