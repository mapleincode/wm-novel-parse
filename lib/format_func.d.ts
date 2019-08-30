import { Chapter } from './chapter';
import ParseOptions from './ParseOptions';
interface FormatType {
    (str: string[], options?: ParseOptions): Chapter[];
}
export default function getFormatFunc(headTitle: string): FormatType;
export {};
