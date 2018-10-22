const colors = require("ansi-colors");

module.exports = {
    error: (message) => {
        console.error(`${colors.bgRed(colors.bold(colors.black(`Error`)))} ${message}`);
        console.log("");
        process.exit(0);
    },
    info: (message) => {
        console.info(`${colors.bgYellowBright(colors.bold(colors.blackBright(`Info`)))} ${message}`);
        console.log("");
    },
    success: (message) => {
        console.log(`${colors.bgGreenBright(colors.bold(colors.black(`Success`)))} ${message}`);
        console.log("");
    },
    process: (message) => {
        console.log(`${colors.bgBlue(colors.black(message))}`);
        console.log("");
    },
    warn: (message) => {
        console.warn(`${colors.bgYellow(colors.blackBright(`${message}`))}`);
        console.log("");
    },
    log: (message) => {
        console.log(`${colors.inverse(message)}`)
        console.log("");
    },
    bold: (message) => {
        console.log(`${colors.bold(colors.underline(message))}`)
        console.log("");
    }
}