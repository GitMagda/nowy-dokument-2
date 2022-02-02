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
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const vscode_nls_1 = require("vscode-nls");
const resources_1 = require("../resources");
const testTreeView_1 = require("./testTreeView");
const localize = vscode_nls_1.loadMessageBundle();
class FlatTestTreeDataProvider {
    constructor(report = testTreeView_1.emptyReport) {
        this.report = report;
        this.fetchTestDescriptions = () => __awaiter(this, void 0, void 0, function* () {
            this.descriptions = yield testTreeView_1.getTestDescriptions();
            this.onDidChangeTreeDataEmitter.fire();
        });
        this.getParent = (_element) => {
            return undefined;
        };
        this.getChildren = (element) => {
            if (element) {
                return undefined;
            }
            return this.report.testsuites.flatMap(ts => ts.testCases);
        };
        this.getTreeItem = (item) => {
            const treeItem = new vscode_1.TreeItem(item.name, vscode_1.TreeItemCollapsibleState.None);
            treeItem.iconPath = item.result === "succeeded" ? resources_1.iconCheckGreen : resources_1.iconAlertRed;
            treeItem.tooltip = this.descriptions
                ? this.descriptions.get(item.name)
                : localize("testCase.descriptionLoading", "Description loading...");
            return treeItem;
        };
        this.updateReport = (report = testTreeView_1.emptyReport) => {
            this.report = report;
            this.onDidChangeTreeDataEmitter.fire();
        };
        this.onDidChangeTreeDataEmitter = new vscode_1.EventEmitter();
        this.onDidChangeTreeData = this.onDidChangeTreeDataEmitter.event;
        this.fetchTestDescriptions();
    }
}
exports.FlatTestTreeDataProvider = FlatTestTreeDataProvider;
//# sourceMappingURL=flatTestTreeView.js.map