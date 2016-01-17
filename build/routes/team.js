'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (server) {
  server.route({
    method: 'GET',
    path: '/v1/teams',
    handler: function handler(request, reply) {
      var teams;
      return regeneratorRuntime.async(function handler$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(request.models.Team.findAll({
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
    path: '/v1/teams/{scope}',
    handler: function handler(request, reply) {
      var actions;
      return regeneratorRuntime.async(function handler$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            actions = undefined;
            context$2$0.prev = 1;
            context$2$0.next = 4;
            return regeneratorRuntime.awrap(request.models.Team.scope(request.params.scope).findAll());

          case 4:
            actions = context$2$0.sent;
            context$2$0.next = 10;
            break;

          case 7:
            context$2$0.prev = 7;
            context$2$0.t0 = context$2$0['catch'](1);

            reply(context$2$0.t0);

          case 10:

            reply(actions);

          case 11:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[1, 7]]);
    }
  });

  server.route({
    method: 'GET',
    path: '/v1/team/{id}',
    handler: function handler(request, reply) {
      var team;
      return regeneratorRuntime.async(function handler$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(request.models.Team.findOne({
              where: {
                id: request.params.id
              }
            }));

          case 2:
            team = context$2$0.sent;

            reply(team);

          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  });

  server.route({
    method: 'POST',
    path: '/v1/team',
    handler: function handler(request, reply) {
      var team;
      return regeneratorRuntime.async(function handler$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.prev = 0;
            context$2$0.next = 3;
            return regeneratorRuntime.awrap(request.models.Team.create(request.payload));

          case 3:
            team = context$2$0.sent;
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
    path: '/v1/team/{id}',
    handler: function handler(request, reply) {
      var team;
      return regeneratorRuntime.async(function handler$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.prev = 0;
            context$2$0.next = 3;
            return regeneratorRuntime.awrap(request.models.Team.findOne({
              where: {
                id: request.params.id
              }
            }));

          case 3:
            team = context$2$0.sent;
            context$2$0.next = 6;
            return regeneratorRuntime.awrap(team.destroy());

          case 6:
            context$2$0.next = 11;
            break;

          case 8:
            context$2$0.prev = 8;
            context$2$0.t0 = context$2$0['catch'](0);

            reply(context$2$0.t0);

          case 11:

            reply();

          case 12:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[0, 8]]);
    }
  });

  server.route({
    method: 'PUT',
    path: '/v1/team/{id}',
    handler: function handler(request, reply) {
      var team;
      return regeneratorRuntime.async(function handler$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.prev = 0;
            context$2$0.next = 3;
            return regeneratorRuntime.awrap(request.models.Team.findOne({
              where: {
                id: request.params.id
              }
            }));

          case 3:
            team = context$2$0.sent;
            context$2$0.next = 6;
            return regeneratorRuntime.awrap(team.update(request.payload));

          case 6:
            context$2$0.next = 11;
            break;

          case 8:
            context$2$0.prev = 8;
            context$2$0.t0 = context$2$0['catch'](0);

            reply(context$2$0.t0);

          case 11:

            reply();

          case 12:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[0, 8]]);
    }
  });
};

module.exports = exports['default'];
