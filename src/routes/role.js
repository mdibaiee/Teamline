

export default server => {
  server.route({
    method: 'GET',
    path: '/v1/roles',
    async handler(request, reply) {
      let roles = await request.models.Role.findAll({
        where: request.query
      });

      reply(roles);
    }
  });

	server.route({
		method: 'GET',
		path: '/v1/roles/{scope}',
		async handler(request, reply) {
			let actions;
			try {
				actions = await request.models.Role.scope(request.params.scope).findAll();
			} catch(e) {
				reply(e);
			}

			reply(actions);
		}
	});

  server.route({
    method: 'GET',
    path: '/v1/role/{id}',
    async handler(request, reply) {
      let role = await request.models.Role.findOne({
        where: {
          id: request.params.id
        }
      });

      reply(role);
    }
  });

  server.route({
    method: 'POST',
    path: '/v1/role',
    async handler(request, reply) {
      try {
        let role = await request.models.Role.create(request.payload);
      } catch(e) {
        reply(e);
      }

      reply();
    }
  });

  server.route({
    method: 'DELETE',
    path: '/v1/role/{id}',
    async handler(request, reply) {
      try {
        let role = await request.models.Role.findOne({
          where: {
            id: request.params.id
          }
        });

        await role.destroy();
      } catch(e) {
        reply(e);
      }

      reply();
    }
  });

  server.route({
    method: 'PUT',
    path: '/v1/role/{id}',
    async handler(request, reply) {
      try {
        let role = await request.models.Role.findOne({
          where: {
            id: request.params.id
          }
        });

        await role.update(request.payload);
      } catch(e) {
        reply(e);
      }

      reply();
    }
  })
}
