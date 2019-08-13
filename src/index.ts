import { formatChapter } from './chapter';
import { split } from './utils';

interface ParseOptions {
    autoIncrement?: boolean; // 是否自增章节
    strictMode?: boolean; // 是否需要 title 符合格式
};

export default function done(str: string, options?: ParseOptions) {
    const _options: ParseOptions = {
        autoIncrement: options !== undefined ? options.autoIncrement : false,
        strictMode: options !== undefined ? options.strictMode : true
    }

    const paragraphs = split(str);
    const items = formatChapter(paragraphs, options);
    return items;
}
