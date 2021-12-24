const os = require("os")
module.exports = (os.networkInterfaces()["wlp3s0"][0].address)