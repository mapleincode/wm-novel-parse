export default class ParseOptions {
    private _autoIncrement: boolean = false;
    private _strictMode: boolean = true
    constructor(autoIncrement?: boolean,
        strictMode?: boolean) {
        if (autoIncrement !== undefined) {
            this._autoIncrement = autoIncrement;
        }

        if (strictMode !== undefined) {
            this._strictMode = strictMode;
        }
    }

    get autoIncrement() {
        return this._autoIncrement;
    }

    get stricMode() {
        return this._strictMode;
    }
}
