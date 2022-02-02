"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const junitxml_to_javascript_1 = __importDefault(require("junitxml-to-javascript"));
const util_1 = require("util");
const vscode_1 = __importStar(require("vscode"));
const configuration_1 = require("../configuration");
const extension_1 = require("../extension");
const logger_1 = require("../logger");
const views_1 = require("../views");
const utils_1 = require("./utils");
const jUnitParser = new junitxml_to_javascript_1.default();
const watchTestResultsFile = utils_1.mkCommand("watchTestResultsFile", () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // This was changed from `path.join("**", dotDirname, testResultsFilename)`
    // because on Windows watcher paths separated with `\` somehow didn't work
    const testResultsGlob = `**/${configuration_1.dotDirname}/${configuration_1.testResultsFilename}`;
    const watcher = vscode_1.default.workspace.createFileSystemWatcher(testResultsGlob);
    (_a = extension_1.extensionState.context) === null || _a === void 0 ? void 0 : _a.subscriptions.push(watcher);
    const handleTestResultsFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
        logger_1.info(`Generating report for file \`${file.toString(true)}\`...`);
        const newReport = yield (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const contents = yield vscode_1.default.workspace.fs.readFile(file);
                const text = new util_1.TextDecoder().decode(contents);
                if (!text) {
                    return undefined;
                }
                const parsedTestResults = yield parseTestResultsFile(text);
                return parsedTestResults;
            }
            catch (e) {
                if (e instanceof vscode_1.FileSystemError) {
                    return undefined;
                }
                vscode_1.default.window.showErrorMessage("Could not parse test results file");
                console.error("Could not parse test results file", e);
                return undefined;
            }
        }))();
        logger_1.info("Done.");
        views_1.testTreeViewDataProvider.updateReport(newReport);
    });
    logger_1.info(`Starting to watch filesystem for test result updates with glob \`${testResultsGlob}\``);
    watcher.onDidCreate(handleTestResultsFile);
    watcher.onDidChange(handleTestResultsFile);
    watcher.onDidDelete(handleTestResultsFile);
    // Handle first found existing test results file
    const testResultsFile = (yield vscode_1.default.workspace.findFiles(testResultsGlob))[0];
    if (testResultsFile) {
        handleTestResultsFile(testResultsFile);
    }
    return vscode_1.default.Disposable.from(watcher);
}));
function parseTestResultsFile(content) {
    return jUnitParser.parseXMLString(content);
}
exports.default = watchTestResultsFile;
//# sourceMappingURL=watchTestResultsFile.js.map