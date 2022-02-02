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
const vscode_1 = __importDefault(require("vscode"));
const configuration_1 = require("../configuration");
const mentorReview = ({ cloneUrl, prefix, name }) => __awaiter(void 0, void 0, void 0, function* () {
    const groups = /\/([^/]+)\.git$/.exec(cloneUrl);
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
    const projectPath = path_1.default.join(datadir, prefix, project);
    if (!fs_1.default.existsSync(projectPath)) {
        // await vscode.window.withProgress(
        //     {
        //         title: `Cloning git repository for ${prefix}'s assignment ${name || project}`,
        //         location: vscode.ProgressLocation.Notification,
        //     },
        //     (progress, token) => git.clone(cloneUrl, projectPath),
        // );
    }
    else {
        yield vscode_1.default.window.withProgress({
            title: `Pulling repository for ${prefix}'s assignment ${name || project}`,
            location: vscode_1.default.ProgressLocation.Notification,
        }, (progress, token) => __awaiter(void 0, void 0, void 0, function* () {
            // await git.cwd(projectPath);
            const steps = 3;
            // await git.fetch(undefined, undefined, { "--all": null });
            progress.report({ increment: 100 / steps });
            // await git.reset(["--hard", "origin/master"]);
            progress.report({ increment: 100 / steps });
            // await git.clean("f", ["-d"]);
            progress.report({ increment: 100 / steps });
        }));
    }
    const uri = vscode_1.default.Uri.file(projectPath);
    vscode_1.default.commands.executeCommand("vscode.openFolder", uri, false);
});
exports.default = mentorReview;
//# sourceMappingURL=mentorReview.js.map