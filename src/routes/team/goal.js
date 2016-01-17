

export default server => {
	let db = server.plugins['hapi-sequelize'].db;
  server.route({
    method: 'GET',
    path: '/v1/goals',
    async handler(request, reply) {
      let teams = await request.models.Goal.findAll({
        where: request.query
      });

      reply(teams);
    }
  });

	server.route({
		method: 'GET',
		path: '/v1/goals/{scope}',
		async handler(request, reply) {
			let goals;
			try {
				goals = await request.models.Goal.scope(request.params.scope).findAll();
			} catch(e) {
				reply(e);
			}

			reply(goals);
		}
	});

	server.route({
		method: 'GET',
		path: '/v1/team/{id}/goals/{scope}',
		async handler(request, reply) {
			let goals;
			try {
				goals = await request.models.Goal.scope(request.params.scope).findAll({
					where: {
						TeamId: request.params.id
					}
				});
			} catch(e) {
				reply(e);
			}

			reply(goals);
		}
	});


  server.route({
    method: 'GET',
    path: '/v1/team/{id}/goals',
    async handler(request, reply) {
      let goals;
      try {
        goals = await request.models.Goal.findAll({
          TeamId: request.params.id
        });
      } catch(e) {
        reply(e);
      }

      reply(goals);
    }
  });

  server.route({
    method: 'GET',
    path: '/v1/team/{id}/goal/{goalId}',
    async handler(request, reply) {
      let goal;
      try {
        goal = await request.models.Goal.findOne({
          where: {
            id: request.params.goalId,
            TeamId: request.params.id
          }
        });
      } catch(e) {
        reply(e);
      }

      reply(goal);
    }
  });

  server.route({
    method: 'POST',
    path: '/v1/team/{id}/goal',
    async handler(request, reply) {
      try {
        let goal = await request.models.Goal.create({
          TeamId: request.params.id,
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
    path: '/v1/team/{id}/goal/{goalId}',
    async handler(request, reply) {
      try {
        let goal = await request.models.Goal.findOne({
          where: {
            id: request.params.goalId,
            TeamId: request.params.id
          }
        });

        if (goal)
          await goal.destroy();
      } catch(e) {
        reply(e);
      }

      reply();
    }
  });

  server.route({
    method: 'PUT',
    path: '/v1/team/{id}/goal/{goalId}',
    async handler(request, reply) {
      let goal;
      try {
        goal = await request.models.Goal.findOne({
          where: {
            id: request.params.goalId,
            TeamId: request.params.id
          }
        });

        if (goal)
          await goal.update(request.payload);
      } catch(e) {
        reply(e);
      }

      reply(goal);
    }
  });
}
