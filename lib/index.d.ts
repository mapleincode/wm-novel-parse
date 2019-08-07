interface ParseOptions {
    autoIncrement?: boolean;
    strictMode?: boolean;
}
export default function done(str: string, options?: ParseOptions): import("./chapter").Chapter[];
export {};
