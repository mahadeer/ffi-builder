const print = require("./print");
const exampleUrl = "https://github.com/mahadeer13/ffi-proxy";

module.exports = {
    log: print.log,
    propertyMissingOrEmpty: (propName) => {
        print.error(`Missing ${propName} key or is empty. Please refer to ${exampleUrl} for valid example.`)
    },
    invalidConfigType: () => {
        print.error(`Must provide a valid ffi config. Please refer to ${exampleUrl} for valid example.`);
    },
    notImplementedYet: () => {
        print.info(`The feature is not implemeneted yet, please raise an feature request on ${exampleUrl}`);
    },
    noAddons: () => {
        print.info(`No addons defined, skipping all process..`);
    },
    configNotFound: () => {
        print.error(`Must provide a valid ffi config object or use ffi-config.json. Please refer to ${exampleUrl} for valid example.`);
    },
    buildStarted: () => {
        print.bold(`Building Addons`);
    },
    buildCompleted: () => {
        print.success(`All the binaries are build and ready to use`)
    },
    buildSuccess: (message) => {
        print.process(message);
    },
    buildError: (errMsg) => {
        print.info(errMsg);
        print.error("Build failed...")
    },
    buildInfo: (msg) => {
        print.info(msg);
    }
}