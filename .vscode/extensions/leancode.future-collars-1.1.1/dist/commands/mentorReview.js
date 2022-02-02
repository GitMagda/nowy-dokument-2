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
const promise_1 = __importDefault(require("simple-git/promise"));
const url_1 = require("url");
const vscode_1 = __importDefault(require("vscode"));
const configuration_1 = require("../configuration");
const utils_1 = require("./utils");
const git = promise_1.default();
const mentorReview = utils_1.mkCommand("mentorReview", ({ cloneUrl, prefix, name, accessToken } = {}) => __awaiter(void 0, void 0, void 0, function* () {
    if (!cloneUrl || !prefix) {
        vscode_1.default.window.showWarningMessage("You need to provide assignment clone url and prefix.");
        return;
    }
    const url = new url_1.URL(cloneUrl);
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
    const projectDir = path_1.default.join(datadir, prefix);
    const projectPath = path_1.default.join(projectDir, project);
    if (!fs_1.default.existsSync(projectPath)) {
        yield vscode_1.default.commands.executeCommand("git.clone", url.toString(), projectDir);
    }
    else {
        yield vscode_1.default.window.withProgress({
            title: `Pulling repository for ${prefix}'s assignment ${name || project}`,
            location: vscode_1.default.ProgressLocation.Notification,
        }, (progress) => __awaiter(void 0, void 0, void 0, function* () {
            yield git.cwd(projectPath);
            const steps = 3;
            yield git.fetch({ "--all": null });
            progress.report({ increment: 100 / steps });
            yield git.reset(["--hard", "origin/master"]);
            progress.report({ increment: 100 / steps });
            yield git.clean("f", ["-d"]);
            progress.report({ increment: 100 / steps });
        }));
        const uri = vscode_1.default.Uri.file(projectPath);
        yield vscode_1.default.commands.executeCommand("vscode.openFolder", uri, false);
    }
}));
exports.default = mentorReview;
//# sourceMappingURL=mentorReview.js.map