'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _initialize = require('./initialize');

var _initialize2 = _interopRequireDefault(_initialize);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _sync = require('./sync');

var _sync2 = _interopRequireDefault(_sync);

function start() {
  var cfg = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var server;
  return regeneratorRuntime.async(function start$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return regeneratorRuntime.awrap((0, _initialize2['default'])(cfg));

      case 2:
        server = context$1$0.sent;
        return context$1$0.abrupt('return', new Promise(function (resolve) {
          server.start(function () {
            console.log('Task tracker server running at: ' + server.info.uri);

            (0, _sync2['default'])(server.plugins['hapi-sequelize'].db, cfg);

            resolve(server);
          });
        }));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

if (Object.keys(_config2['default']).length) start(_config2['default']);

exports['default'] = start;
module.exports = exports['default'];
