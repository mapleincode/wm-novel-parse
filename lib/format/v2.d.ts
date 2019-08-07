import { Chapter } from '../chapter';
interface ParseOptions {
    autoIncrement?: boolean;
    strictMode?: boolean;
}
export default function formatV2(strs: string[], options?: ParseOptions): Chapter[];
export {};
