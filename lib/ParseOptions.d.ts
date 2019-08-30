export default class ParseOptions {
    private _autoIncrement;
    private _strictMode;
    constructor(autoIncrement?: boolean, strictMode?: boolean);
    readonly autoIncrement: boolean;
    readonly stricMode: boolean;
}
