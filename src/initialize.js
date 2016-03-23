import Hapi from 'hapi';
import path from 'path';
import Promise from 'bluebird';
import relations from './relations';
import auth from './auth';
import routes from './routes';

export default async (config = {}) => {
  // Config
  config = {
    database: {
      user: 'root',
      dialect: 'mysql',
      database: 'teamline',
      models: path.relative(process.cwd(), path.join(__dirname, './models/**/*.js')),

      ...config.database
    },

    server: {
      host: '127.0.0.1',
      port: 8080,

      ...config.server
    },

    crud: {
      ...config.crud
    },

    auth: {
      // default token (not safe at all!)
      key: 'access_token',
      value: '918273645',
      ...config.auth
    }
  };

  // Create connection
  const server = new Hapi.Server({
    connections: {
      router: {
        stripTrailingSlash: true
      }
    }
  });
  server.connection(config.server);

  // Register plugins
  try {
    const register = Promise.promisify(server.register.bind(server));

    await register({
      register: require('good'),
      options: {
        reporters: [{
          reporter: require('good-file'),
          config: path.join(__dirname, '../../hapi.log'),
          events: { ops: '*', response: '*', error: '*', request: '*' }
        }]
      }
    });

    await register({
      register: require('hapi-sequelize'),
      options: config.database
    });

    const db = server.plugins['hapi-sequelize'].db;
    const models = db.sequelize.models;

    relations(models);

    await register({
      register: require('hapi-sequelize-crud'),
      options: config.crud
    });

    await auth(server, register, config);
    routes(server);
  } catch (error) {
    return console.error('Error registering plugins!', error);
  }

  const db = server.plugins['hapi-sequelize'].db;
  const models = db.sequelize.models;
  await db.sequelize.sync();

  server.ext('onPreHandler', (function preHandler(modelCollections) {
    return function handler(request, reply) {
      request.models = modelCollections;
      reply.continue();
    };
  }(models)));

  return server;
};
