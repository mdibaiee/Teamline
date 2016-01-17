'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('babel-polyfill');

var _initialize = require('./initialize');

var _initialize2 = _interopRequireDefault(_initialize);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function start(config) {
	var server;
	return regeneratorRuntime.async(function start$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				context$1$0.next = 2;
				return regeneratorRuntime.awrap((0, _initialize2['default'])(config));

			case 2:
				server = context$1$0.sent;

				(0, _routes2['default'])(server);

				server.start(function () {
					console.log('Task tracker server running at: ' + server.info.uri);
				});

			case 5:
			case 'end':
				return context$1$0.stop();
		}
	}, null, this);
}

if (Object.keys(_config2['default']).length) start(_config2['default']);

exports['default'] = start;
module.exports = exports['default'];
