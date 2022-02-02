"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __importStar(require("vscode"));
const startAssignment_1 = __importDefault(require("./startAssignment"));
const watchTestResultsFile_1 = __importDefault(require("./watchTestResultsFile"));
const commands = registerCommands(startAssignment_1.default, watchTestResultsFile_1.default);
function subscribeCommands(context) {
    commands.forEach(cmd => {
        context.subscriptions.push(cmd);
    });
}
exports.subscribeCommands = subscribeCommands;
function registerCommands(...commands) {
    return commands.map(cmd => vscode.commands.registerCommand(cmd.id, cmd.run));
}
//# sourceMappingURL=index.js.map