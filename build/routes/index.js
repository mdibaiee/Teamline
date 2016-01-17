'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

exports['default'] = function loadModules(server) {
  var dir = arguments.length <= 1 || arguments[1] === undefined ? __dirname : arguments[1];
  var routes;
  return regeneratorRuntime.async(function loadModules$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return regeneratorRuntime.awrap(_fsPromise2['default'].readdir(dir));

      case 2:
        routes = context$1$0.sent;

        routes.forEach(function callee$1$0(route) {
          var p, stat;
          return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                if (!(route === 'index.js')) {
                  context$2$0.next = 2;
                  break;
                }

                return context$2$0.abrupt('return');

              case 2:
                p = _path2['default'].join(dir, route);
                context$2$0.next = 5;
                return regeneratorRuntime.awrap(_fsPromise2['default'].stat(p));

              case 5:
                stat = context$2$0.sent;

                if (!stat.isDirectory()) {
                  context$2$0.next = 8;
                  break;
                }

                return context$2$0.abrupt('return', loadModules(server, p));

              case 8:

                require(_path2['default'].join(dir, route))(server);

              case 9:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        });

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

module.exports = exports['default'];
