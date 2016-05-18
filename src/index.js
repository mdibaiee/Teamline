if (!global._babelPolyfill) {
  require('babel/polyfill');
}
import initialize from './initialize';
import config from '../config';
import loader from './loader';

async function start(cfg = config) {
  const server = await initialize(cfg);

  return new Promise(resolve => {
    server.start(() => {
      if (!module.parent) console.log(`Teamline server running at: ${server.info.uri}`);
      const { db } = server.plugins['hapi-sequelize'];

      loader(server, db, cfg);

      resolve({ server, db,
        destroy() {
          server.stop();
        },
      });
    });
  });
}

if (!module.parent) start(config);

export default start;
