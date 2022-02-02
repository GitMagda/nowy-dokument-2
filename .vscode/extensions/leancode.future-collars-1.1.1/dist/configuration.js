"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const extension_1 = require("./extension");
exports.dataDirectory = mobx_1.computed(() => { var _a, _b; return path_1.default.join((_b = (_a = extension_1.extensionState.context) === null || _a === void 0 ? void 0 : _a.globalStoragePath, (_b !== null && _b !== void 0 ? _b : os_1.default.homedir())), "futurecollars"); });
/**
 * Extension's name copied from package.json
 */
exports.extensionName = "future-collars";
/**
 * Name of extension's dot directory
 */
exports.dotDirname = `.futurecollars`;
exports.testResultsFilename = "test-results.xml";
//# sourceMappingURL=configuration.js.map