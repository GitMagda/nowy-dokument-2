"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const resources_1 = require("../resources");
class TestSuiteAsTestTreeDataProvider {
    constructor(report = exports.emptyReport) {
        this.report = report;
        this.getParent = (_element) => {
            return undefined;
        };
        this.getChildren = (element) => {
            if (!element) {
                return this.report.testsuites;
            }
            return undefined;
        };
        this.getTreeItem = toTreeItem;
        this.updateReport = (report = exports.emptyReport) => {
            this.report = report;
            this.onDidChangeTreeDataEmitter.fire();
        };
        this.onDidChangeTreeDataEmitter = new vscode_1.EventEmitter();
        this.onDidChangeTreeData = this.onDidChangeTreeDataEmitter.event;
    }
}
exports.TestSuiteAsTestTreeDataProvider = TestSuiteAsTestTreeDataProvider;
exports.emptyReport = { testsuites: [] };
const toTreeItem = (item) => {
    const treeItem = new vscode_1.TreeItem(item.name, vscode_1.TreeItemCollapsibleState.None);
    treeItem.tooltip = item.testCases.map(tc => tc.name).join("\n\n");
    treeItem.iconPath = item.errors > 0 ? resources_1.iconAlertRed : resources_1.iconCheckGreen;
    return treeItem;
};
//# sourceMappingURL=testSuiteAsTestTreeView.js.map