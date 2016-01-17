import path from 'path';
import fs from 'fs-promise';

export default async function loadModules(server, dir = __dirname) {
  let routes = await fs.readdir(dir);

  routes.forEach(async route => {
    if (route === 'index.js') return;
    let p = path.join(dir, route);

    let stat = await fs.stat(p);

    if (stat.isDirectory()) return loadModules(server, p);

    require(path.join(dir, route))(server);
  })
}
