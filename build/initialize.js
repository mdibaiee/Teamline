'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _this = this;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _relations = require('./relations');

var _relations2 = _interopRequireDefault(_relations);

exports['default'] = function callee$0$0(config) {
	var server, register, db, models, Employee, Role, Team, Company, OKR, Action;
	return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				// Config
				config = {
					database: _extends({
						user: 'root',
						dialect: 'mysql',
						database: 'bolt_task_tracker',
						models: 'build/models/**/*.js'

					}, config.database),

					server: _extends({
						host: '127.0.0.1',
						port: 8080

					}, config.server)
				};

				// Create connection
				server = new _hapi2['default'].Server();

				server.connection(config.server);

				// Register plugins
				context$1$0.prev = 3;
				register = _bluebird2['default'].promisify(server.register.bind(server));
				context$1$0.next = 7;
				return regeneratorRuntime.awrap(register({
					register: require('good'),
					options: {
						reporters: [{
							reporter: require('good-console'),
							events: { ops: '*', response: '*', error: '*', request: '*' }
						}, {
							reporter: require('good-file'),
							config: _path2['default'].join(__dirname, '../../hapi.log'),
							events: { ops: '*', response: '*', error: '*', request: '*' }
						}]
					}
				}));

			case 7:
				context$1$0.next = 9;
				return regeneratorRuntime.awrap(register({
					register: require('hapi-sequelize'),
					options: config.database
				}));

			case 9:
				context$1$0.next = 14;
				break;

			case 11:
				context$1$0.prev = 11;
				context$1$0.t0 = context$1$0['catch'](3);
				return context$1$0.abrupt('return', console.error('Error registering plugins!', context$1$0.t0));

			case 14:
				db = server.plugins['hapi-sequelize'].db;
				models = db.sequelize.models;
				Employee = models.Employee;
				Role = models.Role;
				Team = models.Team;
				Company = models.Company;
				OKR = models.OKR;
				Action = models.Action;

				(0, _relations2['default'])(models);

				db.sequelize.sync();

				server.ext('onPreHandler', (function (modelCollections) {
					return function (request, reply) {
						request.models = modelCollections;
						reply['continue']();
					};
				})(models));

				return context$1$0.abrupt('return', server);

			case 26:
			case 'end':
				return context$1$0.stop();
		}
	}, null, _this, [[3, 11]]);
};

module.exports = exports['default'];
