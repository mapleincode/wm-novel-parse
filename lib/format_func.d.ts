import { Chapter } from './chapter';
interface FormatType {
    (str: string[]): Chapter[];
}
export default function getFormatFunc(headTitle: string): FormatType;
export {};
