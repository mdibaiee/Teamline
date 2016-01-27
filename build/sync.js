'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var modulesPath = _path2['default'].resolve(__dirname, '../node_modules');
var modules = _fs2['default'].readdirSync(modulesPath).filter(function (module) {
  return module.startsWith('teamline-');
}).map(function (module) {
  return _path2['default'].resolve(modulesPath, module);
});

exports['default'] = function (db, config) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = modules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var file = _step.value;

      var rq = require(file);

      if (typeof rq === 'function') rq(db, config);else rq['default'](db, config);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

module.exports = exports['default'];
