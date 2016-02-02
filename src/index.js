import initialize from './initialize';
import config from '../config';
import sync from './sync';

async function start(cfg = {}) {
  const server = await initialize(cfg);

  return new Promise(resolve => {
    server.start(() => {
      console.log(`Teamline server running at: ${server.info.uri}`);

      sync(server.plugins['hapi-sequelize'].db, cfg);

      resolve(server);
    });
  });
}

if (Object.keys(config).length) start(config);

export default start;
