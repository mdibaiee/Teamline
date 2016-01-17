'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = function (server) {
  var db = server.plugins['hapi-sequelize'].db;
  server.route({
    method: 'GET',
    path: '/v1/goals',
    handler: function handler(request, reply) {
      var teams;
      return regeneratorRuntime.async(function handler$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(request.models.Goal.findAll({
              where: request.query
            }));

          case 2:
            teams = context$2$0.sent;

            reply(teams);

          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  });

  server.route({
    method: 'GET',
    path: '/v1/goals/{scope}',
    handler: function handler(request, reply) {
      var goals;
      return regeneratorRuntime.async(function handler$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            goals = undefined;
            context$2$0.prev = 1;
            context$2$0.next = 4;
            return regeneratorRuntime.awrap(request.models.Goal.scope(request.params.scope).findAll());

          case 4:
            goals = context$2$0.sent;
            context$2$0.next = 10;
            break;

          case 7:
            context$2$0.prev = 7;
            context$2$0.t0 = context$2$0['catch'](1);

            reply(context$2$0.t0);

          case 10:

            reply(goals);

          case 11:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[1, 7]]);
    }
  });

  server.route({
    method: 'GET',
    path: '/v1/team/{id}/goals/{scope}',
    handler: function handler(request, reply) {
      var goals;
      return regeneratorRuntime.async(function handler$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            goals = undefined;
            context$2$0.prev = 1;
            context$2$0.next = 4;
            return regeneratorRuntime.awrap(request.models.Goal.scope(request.params.scope).findAll({
              where: {
                TeamId: request.params.id
              }
            }));

          case 4:
            goals = context$2$0.sent;
            context$2$0.next = 10;
            break;

          case 7:
            context$2$0.prev = 7;
            context$2$0.t0 = context$2$0['catch'](1);

            reply(context$2$0.t0);

          case 10:

            reply(goals);

          case 11:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[1, 7]]);
    }
  });

  server.route({
    method: 'GET',
    path: '/v1/team/{id}/goals',
    handler: function handler(request, reply) {
      var goals;
      return regeneratorRuntime.async(function handler$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            goals = undefined;
            context$2$0.prev = 1;
            context$2$0.next = 4;
            return regeneratorRuntime.awrap(request.models.Goal.findAll({
              TeamId: request.params.id
            }));

          case 4:
            goals = context$2$0.sent;
            context$2$0.next = 10;
            break;

          case 7:
            context$2$0.prev = 7;
            context$2$0.t0 = context$2$0['catch'](1);

            reply(context$2$0.t0);

          case 10:

            reply(goals);

          case 11:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[1, 7]]);
    }
  });

  server.route({
    method: 'GET',
    path: '/v1/team/{id}/goal/{goalId}',
    handler: function handler(request, reply) {
      var goal;
      return regeneratorRuntime.async(function handler$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            goal = undefined;
            context$2$0.prev = 1;
            context$2$0.next = 4;
            return regeneratorRuntime.awrap(request.models.Goal.findOne({
              where: {
                id: request.params.goalId,
                TeamId: request.params.id
              }
            }));

          case 4:
            goal = context$2$0.sent;
            context$2$0.next = 10;
            break;

          case 7:
            context$2$0.prev = 7;
            context$2$0.t0 = context$2$0['catch'](1);

            reply(context$2$0.t0);

          case 10:

            reply(goal);

          case 11:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[1, 7]]);
    }
  });

  server.route({
    method: 'POST',
    path: '/v1/team/{id}/goal',
    handler: function handler(request, reply) {
      var goal;
      return regeneratorRuntime.async(function handler$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.prev = 0;
            context$2$0.next = 3;
            return regeneratorRuntime.awrap(request.models.Goal.create(_extends({
              TeamId: request.params.id
            }, request.payload)));

          case 3:
            goal = context$2$0.sent;
            context$2$0.next = 9;
            break;

          case 6:
            context$2$0.prev = 6;
            context$2$0.t0 = context$2$0['catch'](0);

            reply(context$2$0.t0);

          case 9:

            reply();

          case 10:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[0, 6]]);
    }
  });

  server.route({
    method: 'DELETE',
    path: '/v1/team/{id}/goal/{goalId}',
    handler: function handler(request, reply) {
      var goal;
      return regeneratorRuntime.async(function handler$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.prev = 0;
            context$2$0.next = 3;
            return regeneratorRuntime.awrap(request.models.Goal.findOne({
              where: {
                id: request.params.goalId,
                TeamId: request.params.id
              }
            }));

          case 3:
            goal = context$2$0.sent;

            if (!goal) {
              context$2$0.next = 7;
              break;
            }

            context$2$0.next = 7;
            return regeneratorRuntime.awrap(goal.destroy());

          case 7:
            context$2$0.next = 12;
            break;

          case 9:
            context$2$0.prev = 9;
            context$2$0.t0 = context$2$0['catch'](0);

            reply(context$2$0.t0);

          case 12:

            reply();

          case 13:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[0, 9]]);
    }
  });

  server.route({
    method: 'PUT',
    path: '/v1/team/{id}/goal/{goalId}',
    handler: function handler(request, reply) {
      var goal;
      return regeneratorRuntime.async(function handler$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            goal = undefined;
            context$2$0.prev = 1;
            context$2$0.next = 4;
            return regeneratorRuntime.awrap(request.models.Goal.findOne({
              where: {
                id: request.params.goalId,
                TeamId: request.params.id
              }
            }));

          case 4:
            goal = context$2$0.sent;

            if (!goal) {
              context$2$0.next = 8;
              break;
            }

            context$2$0.next = 8;
            return regeneratorRuntime.awrap(goal.update(request.payload));

          case 8:
            context$2$0.next = 13;
            break;

          case 10:
            context$2$0.prev = 10;
            context$2$0.t0 = context$2$0['catch'](1);

            reply(context$2$0.t0);

          case 13:

            reply(goal);

          case 14:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[1, 10]]);
    }
  });
};

module.exports = exports['default'];
