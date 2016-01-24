import Hapi from 'hapi';
import path from 'path';
import _ from 'lodash';
import Promise from 'bluebird';
import relations from './relations';

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
		}
	};

	// Create connection
	let server = new Hapi.Server({
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

		let db = server.plugins['hapi-sequelize'].db;
		let models = db.sequelize.models;

		relations(models)

		await register({
			register: require('hapi-sequelize-crud'),
			options: config.crud
		});
	} catch(error) {
		return console.error('Error registering plugins!', error);
	}

	let db = server.plugins['hapi-sequelize'].db;
	let models = db.sequelize.models;
	db.sequelize.sync();

	server.ext('onPreHandler', function(modelCollections) {
    return function(request, reply) {
        request.models = modelCollections;
        reply.continue();
    }
	}(models));

	return server;
}
