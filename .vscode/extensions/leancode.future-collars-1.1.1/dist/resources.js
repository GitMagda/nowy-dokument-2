"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const vscode_1 = require("vscode");
exports.resourcesPath = path_1.default.resolve(__dirname, "..", "resources");
const mkResourceUri = (...pathParts) => vscode_1.Uri.file(path_1.default.join(exports.resourcesPath, ...pathParts));
const mkThemedResourceUri = (...pathParts) => ({
    dark: mkResourceUri("dark", ...pathParts),
    light: mkResourceUri("light", ...pathParts),
});
exports.iconCheck = mkThemedResourceUri("icon-check.svg");
exports.iconAlert = mkThemedResourceUri("icon-alert.svg");
exports.iconCheckGreen = mkResourceUri("icon-check.svg");
exports.iconAlertRed = mkResourceUri("icon-alert.svg");
//# sourceMappingURL=resources.js.map