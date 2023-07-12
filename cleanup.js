let projectBasePath = "";

const fs = require('fs-extra');
fs.removeSync(projectBasePath + "platforms", { recursive: true, force: true });
fs.removeSync(projectBasePath + "node_modules", { recursive: true, force: true });
fs.removeSync(projectBasePath + "plugins", { recursive: true, force: true });
