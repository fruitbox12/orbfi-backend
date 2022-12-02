const { KeyvFile } = require("keyv-file");
const inDB = new KeyvFile({ filename: "conf.json" });
exports.inDB = inDB;
