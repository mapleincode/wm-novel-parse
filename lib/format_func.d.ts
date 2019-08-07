import { Chapter } from './chapter';
interface ParseOptions {
    autoIncrement?: boolean;
    strictMode?: boolean;
}
interface FormatType {
    (str: string[], options?: ParseOptions): Chapter[];
}
export default function getFormatFunc(headTitle: string): FormatType;
export {};
