const path = require("path");
const messages = require("./messages");

module.exports = {
    isValid: (value) => {
        if (value == undefined || value == null || value == "") {
            return false;
        }
        return true;
    },
    isEmpty: (obj) => {
        if (obj == undefined || obj == null || obj == []) {
            return true;
        }
        return false;
    },
    transformConfig: (config, callerPath) => {
        var obj = {};
        if (config.root == undefined || config.root == "") {
            messages.propertyMissingOrEmpty("root");
        }
        if (config.lib == undefined || config.lib == "") {
            messages.propertyMissingOrEmpty("lib");
        }
        if (config.addons == undefined || config.addons.length == 0) {
            messages.propertyMissingOrEmpty("addons");
        }
        const platform = process.platform;
        const target = platform == "win32" ? "dll" : platform == "darwin" ? "dylib" : "so";
        const addonPath = path.resolve(callerPath, config.root);
        obj.addons = config.addons.map(addon => {
            const cwd = (addon.src) ? path.resolve(addonPath, addon.src) : path.resolve(addonPath, addon.name);
            const bin = (addon.dist) ? path.resolve(cwd, addon.dist) : path.resolve(addonPath, addon.name);
            const alias = addon.alias || addon.name;
            const buildCmd = addon.buildCmd
                .replace(/[$]{name}/g, addon.name)
                .replace(/[$]{alias}/g, alias)
                .replace(/[$]{target}/g, target);
            let afterBuildCmd = addon.afterBuildCmd || "ECHO ";
            afterBuildCmd = afterBuildCmd
                .replace(/[$]{name}/g, addon.name)
                .replace(/[$]{alias}/g, alias)
                .replace(/[$]{target}/g, target);
            return {
                "name": addon.name,
                "alias": alias,
                "buildCmd": buildCmd,
                "afterBuildCmd": afterBuildCmd,
                "fileName": `${alias}.${target}`,
                "cwd": cwd,
                "bin": bin,
                "lib": path.resolve(callerPath, config.lib)
            };
        });
        return obj;
    },
    sendAddonsInfo: (config) => {
        return config.addons.map(addon => {
            return {
                "name": addon.alias || addon.name,
                "fileName": addon.fileName,
                "filePath": addon.lib
            };
        });
    }
}