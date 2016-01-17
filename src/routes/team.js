

export default server => {
  server.route({
    method: 'GET',
    path: '/v1/teams',
    async handler(request, reply) {
      let teams = await request.models.Team.findAll({
        where: request.query
      });

      reply(teams);
    }
  });

  server.route({
    method: 'GET',
    path: '/v1/teams/{scope}',
    async handler(request, reply) {
      let actions;
      try {
        actions = await request.models.Team.scope(request.params.scope).findAll();
      } catch(e) {
        reply(e);
      }

      reply(actions);
    }
  });


  server.route({
    method: 'GET',
    path: '/v1/team/{id}',
    async handler(request, reply) {
      let team = await request.models.Team.findOne({
        where: {
          id: request.params.id
        }
      });

      reply(team);
    }
  });

  server.route({
    method: 'POST',
    path: '/v1/team',
    async handler(request, reply) {
      try {
        let team = await request.models.Team.create(request.payload);
      } catch(e) {
        reply(e);
      }

      reply();
    }
  });

  server.route({
    method: 'DELETE',
    path: '/v1/team/{id}',
    async handler(request, reply) {
      try {
        let team = await request.models.Team.findOne({
          where: {
            id: request.params.id
          }
        });

        await team.destroy();
      } catch(e) {
        reply(e);
      }

      reply();
    }
  });

  server.route({
    method: 'PUT',
    path: '/v1/team/{id}',
    async handler(request, reply) {
      try {
        let team = await request.models.Team.findOne({
          where: {
            id: request.params.id
          }
        });

        await team.update(request.payload);
      } catch(e) {
        reply(e);
      }

      reply();
    }
  })
}
