"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configuration_1 = require("../configuration");
function mkCommand(commandId, handler) {
    const commandIdWithExtensionName = commandId.startsWith(configuration_1.extensionName)
        ? commandId
        : `${configuration_1.extensionName}.${commandId}`;
    return { id: commandIdWithExtensionName, run: handler };
}
exports.mkCommand = mkCommand;
//# sourceMappingURL=utils.js.map