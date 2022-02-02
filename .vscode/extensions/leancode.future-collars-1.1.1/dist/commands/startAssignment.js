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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const vscode_1 = __importDefault(require("vscode"));
const configuration_1 = require("../configuration");
const logger_1 = require("../logger");
const utils_1 = require("./utils");
const startAssignment = utils_1.mkCommand("startAssignment", ({ cloneUrl, accessToken } = {}) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.debug("Starting assignment with params %j", { cloneUrl, accessToken });
    const actualCloneUrl = cloneUrl || (yield vscode_1.default.window.showInputBox({ prompt: "Assignment repository git clone URL" }));
    if (!actualCloneUrl) {
        vscode_1.default.window.showInformationMessage("Pick an assignment");
        return;
    }
    const url = new url_1.URL(actualCloneUrl);
    if (accessToken) {
        url.username = "oauth2";
        url.password = accessToken;
    }
    const groups = /\/([^/]+)\.git$/.exec(url.pathname);
    const datadir = configuration_1.dataDirectory.get();
    if (!groups) {
        vscode_1.default.window.showInformationMessage("Git clone URL does not match regex");
        return;
    }
    const project = groups[1];
    if (!configuration_1.dataDirectory) {
        vscode_1.default.window.showInformationMessage("Data directory is not defined");
        return;
    }
    if (!fs_1.default.existsSync(datadir)) {
        fs_1.default.mkdirSync(datadir, { recursive: true });
    }
    const projectPath = path_1.default.join(datadir, project);
    if (!fs_1.default.existsSync(projectPath)) {
        logger_1.info("Project %s does not exist. Cloning.", projectPath.toString());
        yield vscode_1.default.commands.executeCommand("git.clone", url.toString(), datadir);
    }
    else {
        logger_1.debug("Project %s exists. Opening.", projectPath.toString());
        const uri = vscode_1.default.Uri.file(projectPath);
        yield vscode_1.default.commands.executeCommand("vscode.openFolder", uri, false);
        logger_1.debug("Project opened.");
    }
}));
exports.default = startAssignment;
//# sourceMappingURL=startAssignment.js.map