"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParseOptions {
    constructor(autoIncrement, strictMode) {
        this._autoIncrement = false;
        this._strictMode = true;
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
exports.default = ParseOptions;
