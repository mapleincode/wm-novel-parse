import { formatChapter } from './chapter';
import { split } from './utils';
import ParseOptions from './ParseOptions';

interface _ParseOptions {
    autoIncrement?: boolean; // 是否自增章节
    strictMode?: boolean; // 是否需要 title 符合格式
};

export default function done(str: string, options?: _ParseOptions) {
    options = options || {};
    const _options = new ParseOptions(options.autoIncrement, options.strictMode);
    const paragraphs = split(str);
    const items = formatChapter(paragraphs, _options);
    return items;
}
