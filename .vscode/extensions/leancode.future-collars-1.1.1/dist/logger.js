"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = __importStar(require("log4js"));
const util = __importStar(require("util"));
const vscode_1 = require("vscode");
let isConfigured = false;
let isDisabled = false;
let enableConsole = false;
let logger;
// The logger's <configure> function must be invoked before any Logging can take place.
function configure(configLogLevel) {
    if (configLogLevel === "None") {
        isDisabled = true;
        if (logger) {
            logger.info(`Disabling Logging`);
            log4js.shutdown(logShutdownErr => {
                if (logShutdownErr) {
                    console.error(`unable to shutdown Logger: <${logShutdownErr.message}>`);
                }
                isConfigured = false;
            });
        }
        return;
    }
    if (logger) {
        // ensure no attempts to log anything before before the logger is re-configured
        isDisabled = true;
        logger.info(`Re-configuring Logging, New Log Level will be: <${configLogLevel}>`);
        log4js.shutdown(logShutdownErr => {
            if (logShutdownErr) {
                console.error(`unable to shutdown Logger: <${logShutdownErr.message}>`);
            }
            logger = configureLog4js(configLogLevel);
            isDisabled = false;
            isConfigured = true;
            logger.info(`Beginning Logging, Log Level: <${configLogLevel}>`);
        });
    }
    else {
        logger = configureLog4js(configLogLevel);
        isDisabled = false;
        isConfigured = true;
        logger.info(`Beginning Logging, Log Level: <${configLogLevel}>`);
    }
}
exports.configure = configure;
function configureLog4js(configLogLevel) {
    const log4jsLogLevel = configToLog4jsLogLevel(configLogLevel);
    const ourExtOutChannel = vscode_1.window.createOutputChannel("FutureCollars");
    const vscodeOutChannelAppender = {
        configure: (config, layouts) => {
            const vscodeAppender = (loggingEvent) => {
                const layout = layouts.basicLayout;
                ourExtOutChannel.appendLine(layout(loggingEvent, config.timezoneOffset));
            };
            vscodeAppender.shutdown = (done) => {
                ourExtOutChannel.dispose();
                setTimeout(done, 10);
            };
            return vscodeAppender;
        },
    };
    log4js.configure({
        appenders: {
            vscodeOutChannel: {
                type: vscodeOutChannelAppender,
            },
        },
        categories: {
            default: { appenders: ["vscodeOutChannel"], level: log4jsLogLevel },
        },
    });
    return log4js.getLogger();
}
function configToLog4jsLogLevel(configLogLevel) {
    switch (configLogLevel) {
        case "Fatal":
        case "Error":
        case "Debug":
        case "Trace":
            return configLogLevel.toLowerCase();
        case "Information":
            return "info";
        case "Warning":
            return "warn";
        default:
            throw Error(`Unrecognized Log Level: <${configLogLevel}>!`);
    }
}
function assertInitialized() {
    if (isConfigured === false) {
        throw Error("<logger.configure> must be called **before** any attempt to actually log anything!");
    }
}
function trace(msg, ...args) {
    if (isDisabled) {
        return; // NOOP
    }
    if (enableConsole) {
        console.trace(util.format(msg, args));
    }
    assertInitialized();
    logger.trace(msg, args);
}
exports.trace = trace;
function debug(msg, ...args) {
    if (isDisabled) {
        return; // NOOP
    }
    if (enableConsole) {
        console.debug(util.format(msg, args));
    }
    assertInitialized();
    logger.debug(msg, args);
}
exports.debug = debug;
function info(msg, ...args) {
    if (isDisabled) {
        return; // NOOP
    }
    if (enableConsole) {
        console.info(util.format(msg, args));
    }
    assertInitialized();
    logger.info(msg, args);
}
exports.info = info;
function warn(msg, ...args) {
    if (isDisabled) {
        return; // NOOP
    }
    if (enableConsole) {
        console.warn(util.format(msg, args));
    }
    assertInitialized();
    logger.warn(msg, args);
}
exports.warn = warn;
function error(msg, ...args) {
    if (isDisabled) {
        return; // NOOP
    }
    if (enableConsole) {
        console.error(util.format(msg, args));
    }
    assertInitialized();
    logger.error(msg, args);
}
exports.error = error;
function fatal(msg, ...args) {
    if (isDisabled) {
        return; // NOOP
    }
    if (enableConsole) {
        console.error(util.format(msg, args));
    }
    assertInitialized();
    logger.fatal(msg, args);
}
exports.fatal = fatal;
//# sourceMappingURL=logger.js.map