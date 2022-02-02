"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __importStar(require("vscode"));
function getGitApi() {
    var _a, _b;
    const gitExtension = (_a = vscode.extensions.getExtension("vscode.git")) === null || _a === void 0 ? void 0 : _a.exports;
    return (_b = gitExtension) === null || _b === void 0 ? void 0 : _b.getAPI(1);
}
exports.getGitApi = getGitApi;
function getRepository(uri) {
    return new Promise(resolve => {
        var _a;
        const git = getGitApi();
        if (!git) {
            resolve(undefined);
            return;
        }
        let repository;
        if (uri) {
            repository = (_a = git.getRepository(uri), (_a !== null && _a !== void 0 ? _a : undefined));
        }
        else {
            repository = git.repositories[0];
        }
        if (repository) {
            resolve(repository);
            return;
        }
        let resolved = false;
        let timeout = setTimeout(() => {
            if (!resolved) {
                resolved = true;
                openRepositoryDisposer.dispose();
                resolve(undefined);
            }
        }, 10000);
        const openRepositoryDisposer = git.onDidOpenRepository(r => {
            if (!resolved) {
                resolved = true;
                openRepositoryDisposer.dispose();
                clearTimeout(timeout);
                resolve(r);
            }
        });
    });
}
exports.default = getRepository;
//# sourceMappingURL=getRepository.js.map