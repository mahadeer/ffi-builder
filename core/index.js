const fse = require("fs-extra");
const nrc = require("node-run-cmd");
const messages = require("../tools/messages");
const utils = require("../tools/utils");
const path = require("path");
const callerPath = path.dirname(process.argv[1]);
const CONFIG_KEY = Symbol("FFI_CONFIG");

const BuildAddon = (addon) => {
    messages.log(`Building ${addon.alias}`);
    const buildOptions = {
        cwd: addon.cwd,
        onDone: () => {
            messages.buildSuccess(`Build completed for ${addon.fileName}`);
        },
        onData: (data) => {
            messages.log(data);
        }
    };
    return nrc.run(addon.buildCmd, buildOptions)
        .then(() => {
            return nrc.run(addon.afterBuildCmd, { cwd: addon.cwd });
        })
        .then(() => {
            try {
                const src = `${addon.bin}/${addon.fileName}`;
                const dest = `${addon.lib}/${addon.fileName}`;
                return fse.move(src, dest, { overwrite: true })
                    .then(() => {
                        messages.buildInfo(`Moved ${addon.fileName} addon to ${addon.lib}`);
                    });
            } catch (err) {
                return err;
            }
        });
}

const BuildBinaries = () => {
    const config = global[CONFIG_KEY];
    return Promise.all(config.addons.map(addon => BuildAddon(addon)));
}

module.exports = (config) => {
    try {
        if (utils.isValid(config)) {
            switch (typeof config) {
                case "string":
                    // TODO for relative path
                    messages.notImplementedYet();
                    break;
                case "object":
                    break;
                default:
                    messages.invalidConfigType();
                    break;
            }
            global[CONFIG_KEY] = utils.transformConfig(config, callerPath);
        } else {
            var ffiConfig = path.resolve(callerPath, "./ffi-config.json");
            global[CONFIG_KEY] = utils.transformConfig(require(ffiConfig), callerPath);
        }
    } catch (ex) {
        messages.configNotFound();
    }
    // After config's have been set
    return new Promise((resolve, reject) => {
        try {
            messages.buildStarted();
            BuildBinaries()
                .then(() => {
                    messages.buildCompleted();
                    resolve(utils.sendAddonsInfo(global[CONFIG_KEY]));
                })
                .catch(err => {
                    reject(err);
                });
        } catch (err) {
            messages.buildError(err);
            reject(err);
        }
    });
}