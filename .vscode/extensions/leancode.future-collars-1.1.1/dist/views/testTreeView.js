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
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const vscode_1 = __importStar(require("vscode"));
const resources_1 = require("../resources");
class TestTreeDataProvider {
    constructor(report = exports.emptyReport) {
        this.report = report;
        this.descriptions = new Map();
        this.fetchDescriptions = () => __awaiter(this, void 0, void 0, function* () {
            this.descriptions = yield getTestDescriptions();
        });
        this.getParent = (element) => {
            switch (element.kind) {
                case "testsuite":
                    return undefined;
                case "testcase": {
                    const foundTestsuite = this.report.testsuites.find(ts => ts.testCases.find(tc => tc.name === element.name) !== undefined);
                    return foundTestsuite ? fromTestsuite(foundTestsuite) : undefined;
                }
            }
        };
        this.getChildren = (element) => {
            if (!element) {
                return this.report.testsuites.map(fromTestsuite);
            }
            switch (element.kind) {
                case "testsuite":
                    return element.testCases.map(fromTestCase);
                case "testcase":
                    return undefined;
            }
        };
        this.getTreeItem = (item) => {
            switch (item.kind) {
                case "testsuite":
                    return new TestsuiteTreeItem(item);
                case "testcase":
                    return new TestCaseTreeItem(item, this.descriptions[item.name]);
            }
        };
        this.updateReport = (report = exports.emptyReport) => {
            this.report = report;
            this.onDidChangeTreeDataEmitter.fire();
        };
        this.onDidChangeTreeDataEmitter = new vscode_1.EventEmitter();
        this.onDidChangeTreeData = this.onDidChangeTreeDataEmitter.event;
        this.fetchDescriptions().then(_ => this.onDidChangeTreeDataEmitter.fire());
    }
}
exports.TestTreeDataProvider = TestTreeDataProvider;
const fromTestCase = (testCase) => (Object.assign({ kind: "testcase" }, testCase));
const fromTestsuite = (testsuite) => (Object.assign({ kind: "testsuite" }, testsuite));
exports.emptyReport = { testsuites: [] };
class TestsuiteTreeItem extends vscode_1.TreeItem {
    constructor(data) {
        super(data.name, vscode_1.TreeItemCollapsibleState.Expanded);
        this.data = data;
    }
    get tooltip() {
        return `${this.data.errors === 0 ? "Passed" : "Failed"} (${this.data.succeeded}/${this.data.tests} passed)`;
    }
    get iconPath() {
        return this.data.errors === 0 ? resources_1.iconCheckGreen : resources_1.iconAlertRed;
    }
}
class TestCaseTreeItem extends vscode_1.TreeItem {
    constructor(data, descriptionText) {
        super(data.name, vscode_1.TreeItemCollapsibleState.None);
        this.data = data;
        this.descriptionText = descriptionText;
    }
    get tooltip() {
        return this.descriptionText;
    }
    get iconPath() {
        return this.data.result === "succeeded" ? resources_1.iconCheckGreen : resources_1.iconAlertRed;
    }
}
exports.TestCaseTreeItem = TestCaseTreeItem;
function getTestDescriptions() {
    return __awaiter(this, void 0, void 0, function* () {
        const allDescriptions = yield Promise.all((vscode_1.default.workspace.workspaceFolders || []).map((folder) => __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = folder.uri.with({
                    path: path_1.default.join(folder.uri.path, ".futurecollars", "test-descriptions.json"),
                });
                const content = yield vscode_1.default.workspace.fs.readFile(uri);
                const text = new util_1.TextDecoder().decode(content);
                const parsed = JSON.parse(text);
                if (typeof parsed === "object" && parsed !== null) {
                    return new Map(Object.entries(parsed).map(([k, v]) => [String(k), String(v)]));
                }
                return undefined;
            }
            catch (e) {
                return undefined;
            }
        })));
        return new Map(allDescriptions.flatMap(m => (m ? [...m.entries()] : [])));
    });
}
exports.getTestDescriptions = getTestDescriptions;
//# sourceMappingURL=testTreeView.js.map