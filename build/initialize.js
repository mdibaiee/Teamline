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

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _relations = require('./relations');

var _relations2 = _interopRequireDefault(_relations);

exports['default'] = function callee$0$0() {
  var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var server, register, _db, _models, db, models;

  return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        // Config
        config = {
          database: _extends({
            user: 'root',
            dialect: 'mysql',
            database: 'teamline',
            models: _path2['default'].relative(process.cwd(), _path2['default'].join(__dirname, './models/**/*.js'))

          }, config.database),

          server: _extends({
            host: '127.0.0.1',
            port: 8080

          }, config.server),

          crud: _extends({}, config.crud)
        };

        // Create connection
        server = new _hapi2['default'].Server({
          connections: {
            router: {
              stripTrailingSlash: true
            }
          }
        });

        server.connection(config.server);

        // Register plugins
        context$1$0.prev = 3;
        register = _bluebird2['default'].promisify(server.register.bind(server));
        context$1$0.next = 7;
        return regeneratorRuntime.awrap(register({
          register: require('good'),
          options: {
            reporters: [{
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
        _db = server.plugins['hapi-sequelize'].db;
        _models = _db.sequelize.models;

        (0, _relations2['default'])(_models);

        context$1$0.next = 14;
        return regeneratorRuntime.awrap(register({
          register: require('hapi-sequelize-crud'),
          options: config.crud
        }));

      case 14:
        context$1$0.next = 19;
        break;

      case 16:
        context$1$0.prev = 16;
        context$1$0.t0 = context$1$0['catch'](3);
        return context$1$0.abrupt('return', console.error('Error registering plugins!', context$1$0.t0));

      case 19:
        db = server.plugins['hapi-sequelize'].db;
        models = db.sequelize.models;

        db.sequelize.sync();

        server.ext('onPreHandler', (function preHandler(modelCollections) {
          return function handler(request, reply) {
            request.models = modelCollections;
            reply['continue']();
          };
        })(models));

        return context$1$0.abrupt('return', server);

      case 24:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this, [[3, 16]]);
};

module.exports = exports['default'];
