"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = __importDefault(require("vscode"));
const gitExtension = (_a = vscode_1.default.extensions.getExtension("vscode.git")) === null || _a === void 0 ? void 0 : _a.exports;
const git = (_b = gitExtension) === null || _b === void 0 ? void 0 : _b.getAPI(1);
exports.default = git;
//# sourceMappingURL=git copy.js.map