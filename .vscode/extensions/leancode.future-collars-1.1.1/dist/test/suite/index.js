"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob"));
const mocha_1 = __importDefault(require("mocha"));
const path_1 = __importDefault(require("path"));
function run() {
    // Create the mocha test
    const mocha = new mocha_1.default({
        ui: "tdd",
    });
    mocha.useColors(true);
    const testsRoot = path_1.default.resolve(__dirname, "..");
    return new Promise((c, e) => {
        glob_1.default("**/**.test.js", { cwd: testsRoot }, (err, files) => {
            if (err) {
                return e(err);
            }
            // Add files to the test suite
            files.forEach(f => mocha.addFile(path_1.default.resolve(testsRoot, f)));
            try {
                // Run the mocha test
                mocha.run(failures => {
                    if (failures > 0) {
                        e(new Error(`${failures} tests failed.`));
                    }
                    else {
                        c();
                    }
                });
            }
            catch (err) {
                e(err);
            }
        });
    });
}
exports.run = run;
//# sourceMappingURL=index.js.map