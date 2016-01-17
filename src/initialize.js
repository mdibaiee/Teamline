import Hapi from 'hapi';
import path from 'path';
import _ from 'lodash';
import Promise from 'bluebird';
import relations from './relations';

export default async config => {
	// Config
	config = {
		database: {
			user: 'root',
			dialect: 'mysql',
			database: 'bolt_task_tracker',
			models: 'build/models/**/*.js',

			...config.database
		},

		server: {
			host: '127.0.0.1',
			port: 8080,

			...config.server
		},
	};

	// Create connection
	let server = new Hapi.Server();
	server.connection(config.server);


	// Register plugins
	try {
		const register = Promise.promisify(server.register.bind(server));

		await register({
			register: require('good'),
			options: {
				reporters: [{
					reporter: require('good-console'),
					events: { ops: '*', response: '*', error: '*', request: '*' }
				}, {
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
	} catch(error) {
		return console.error('Error registering plugins!', error);
	}

	let db = server.plugins['hapi-sequelize'].db;
	let models = db.sequelize.models;

	let { Employee, Role, Team, Company, OKR, Action } = models;
	relations(models)


	db.sequelize.sync();

	server.ext('onPreHandler', function(modelCollections) {
    return function(request, reply) {
        request.models = modelCollections;
        reply.continue();
    }
	}(models));

	return server;
}
