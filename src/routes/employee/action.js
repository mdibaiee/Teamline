

export default server => {
	let db = server.plugins['hapi-sequelize'].db;
  server.route({
    method: 'GET',
    path: '/v1/actions',
    async handler(request, reply) {
      let employees = await request.models.Action.findAll({
        where: request.query
      });

      reply(employees);
    }
  });

	server.route({
		method: 'GET',
		path: '/v1/actions/{scope}',
		async handler(request, reply) {
			let actions;
			try {
				actions = await request.models.Action.scope(request.params.scope).findAll();
			} catch(e) {
				reply(e);
			}

			reply(actions);
		}
	});

  server.route({
    method: 'GET',
    path: '/v1/employee/{id}/actions',
    async handler(request, reply) {
      let actions;
      try {
        actions = await request.models.Action.findAll({
          EmployeeId: request.params.id
        });
      } catch(e) {
        reply(e);
      }

      reply(actions);
    }
  });

	server.route({
		method: 'GET',
		path: '/v1/employee/{id}/actions/{scope}',
		async handler(request, reply) {
			let actions;
			try {
				actions = await request.models.Action.scope(request.params.scope).findAll({
					where: {
						EmployeeId: request.params.id
					}
				});
			} catch(e) {
				reply(e);
			}

			reply(actions);
		}
	});

  server.route({
    method: 'GET',
    path: '/v1/employee/{id}/action/{actionId}',
    async handler(request, reply) {
      let action;
      try {
        action = await request.models.Action.findOne({
          where: {
            id: request.params.actionId,
            EmployeeId: request.params.id
          }
        });
      } catch(e) {
        reply(e);
      }

      reply(action);
    }
  });

  server.route({
    method: 'POST',
    path: '/v1/employee/{id}/action',
    async handler(request, reply) {
      try {
        let action = await request.models.Action.create({
          EmployeeId: request.params.id,
          ...request.payload
        });
      } catch(e) {
        reply(e);
      }

      reply();
    }
  });

  server.route({
    method: 'DELETE',
    path: '/v1/employee/{id}/action/{actionId}',
    async handler(request, reply) {
      try {
        let action = await request.models.Action.findOne({
          where: {
            id: request.params.actionId,
            EmployeeId: request.params.id
          }
        });

        if (action)
          await action.destroy();
      } catch(e) {
        reply(e);
      }

      reply();
    }
  });

  server.route({
    method: 'PUT',
    path: '/v1/employee/{id}/action/{actionId}',
    async handler(request, reply) {
      let action;
      try {
        action = await request.models.Action.findOne({
          where: {
            id: request.params.actionId,
            EmployeeId: request.params.id
          }
        });

        if (action)
          await action.update(request.payload);
      } catch(e) {
        reply(e);
      }

      reply(action);
    }
  });
}
