export interface ChapterOptions {
    volumeStatus: boolean;
    title: string;
    volumeTitle?: string;
    volumeNumber?: number;
    chapterNumber: number;
}
export declare class Chapter {
    private strs;
    private options;
    constructor(options: ChapterOptions, strs?: string[]);
    push(str: string): void;
    readonly sentences: string[];
    readonly title: string;
    readonly fullTitle: string;
    readonly volumeNumber: number | undefined;
    readonly volumeStr: string;
    readonly volumeTitle: string;
    readonly fullVolumeTitle: string;
    readonly chapterNumber: number;
    readonly chapterStr: string;
    toHtml(className?: string): string;
    toJSON(): {
        title: string;
        sentences: string[];
    };
}
export declare function formatChapter(strs: string[]): Chapter[];
