import fs from 'fs';
import path from 'path';

const modulesPath = path.resolve(__dirname, '../node_modules');
const modules = fs.readdirSync(modulesPath)
.filter(module =>
  module.startsWith('teamline-')
).map(module =>
  path.resolve(modulesPath, module)
);

export default (db, config) => {
  for (const file of modules) {
    const rq = require(file);

    if (typeof rq === 'function') rq(db, config);
    else rq.default(db, config);
  }
};
