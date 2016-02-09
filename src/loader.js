import fs from 'fs';
import path from 'path';

const modulesPath = path.resolve(__dirname, '../node_modules');
const modules = fs.readdirSync(modulesPath)
.filter(module =>
  module.startsWith('teamline-')
).map(module =>
  path.resolve(modulesPath, module)
);

export default (server, db, config) => {
  for (const file of modules) {
    const rq = require(file);

    try {
      if (typeof rq === 'function') rq(server, db, config);
      else rq.default(server, db, config);
    } catch (e) {
      console.error('Teamline plugin error', e);
    }
  }
};
