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
const console_1 = require("console");
const querystring_1 = __importDefault(require("querystring"));
const mentorReview_1 = __importDefault(require("./commands/mentorReview"));
const startAssignment_1 = __importDefault(require("./commands/startAssignment"));
function uriHandler(uri) {
    return __awaiter(this, void 0, void 0, function* () {
        console_1.debug("Received deeplink %s", uri.toString());
        if (uri.path === "/startAssignment") {
            console_1.debug("Received start assignment deeplink");
            const query = querystring_1.default.parse(uri.query);
            if (typeof query !== "object" || query === null) {
                console_1.debug("Query is empty. Skipping");
                return;
            }
            const cloneUrl = toSingle(query.cloneUrl);
            if (!cloneUrl) {
                console_1.debug("CloneUrl does not exist. Skipping");
                return;
            }
            const accessToken = toSingle(query.accessToken);
            console_1.debug("Starting assignment.");
            yield startAssignment_1.default.run({
                cloneUrl,
                accessToken,
            });
            console_1.debug("Assignment started.");
        }
        else if (uri.path === "/mentorReview") {
            const query = querystring_1.default.parse(uri.query);
            if (typeof query !== "object" || query === null) {
                return;
            }
            const cloneUrl = toSingle(query.cloneUrl);
            const prefix = toSingle(query.prefix);
            if (!prefix || !cloneUrl) {
                return;
            }
            const name = toSingle(query.name);
            const accessToken = toSingle(query.accessToken);
            mentorReview_1.default.run({
                cloneUrl,
                prefix,
                name,
                accessToken,
            });
        }
    });
}
exports.default = uriHandler;
const toSingle = (value) => (Array.isArray(value) ? value[0] : value);
//# sourceMappingURL=uriHandler.js.map