

export default server => {
	let db = server.plugins['hapi-sequelize'].db;
  server.route({
    method: 'GET',
    path: '/v1/vacations',
    async handler(request, reply) {
      let employees = await request.models.Vacation.findAll({
        where: request.query
      });

      reply(employees);
    }
  });

	server.route({
		method: 'GET',
		path: '/v1/vacations/{scope}',
		async handler(request, reply) {
			let actions;
			try {
				actions = await request.models.Vacation.scope(request.params.scope).findAll();
			} catch(e) {
				reply(e);
			}

			reply(actions);
		}
	});

  server.route({
    method: 'GET',
    path: '/v1/employee/{id}/vacations',
    async handler(request, reply) {
      let vacations;
      try {
        vacations = await request.models.Vacation.findAll({
          EmployeeId: request.params.id
        });
      } catch(e) {
        reply(e);
      }

      reply(vacations);
    }
  });

	server.route({
		method: 'GET',
		path: '/v1/employee/{id}/vacations/{scope}',
		async handler(request, reply) {
			let vacations;
			try {
				vacations = await request.models.Vacation.scope(request.params.scope).findAll({
					where: {
						EmployeeId: request.params.id
					}
				});
			} catch(e) {
				reply(e);
			}

			reply(vacations);
		}
	});

  server.route({
    method: 'GET',
    path: '/v1/employee/{id}/vacation/{vacationId}',
    async handler(request, reply) {
      let vacation;
      try {
        vacation = await request.models.Vacation.findOne({
          where: {
            id: request.params.vacationId,
            EmployeeId: request.params.id
          }
        });
      } catch(e) {
        reply(e);
      }

      reply(vacation);
    }
  });

  server.route({
    method: 'POST',
    path: '/v1/employee/{id}/vacation',
    async handler(request, reply) {
      try {
        let vacation = await request.models.Vacation.create({
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
    path: '/v1/employee/{id}/vacation/{vacationId}',
    async handler(request, reply) {
      try {
        let vacation = await request.models.Vacation.findOne({
          where: {
            id: request.params.vacationId,
            EmployeeId: request.params.id
          }
        });

        if (vacation)
          await vacation.destroy();
      } catch(e) {
        reply(e);
      }

      reply();
    }
  });

  server.route({
    method: 'PUT',
    path: '/v1/employee/{id}/vacation/{vacationId}',
    async handler(request, reply) {
      let vacation;
      try {
        vacation = await request.models.Vacation.findOne({
          where: {
            id: request.params.vacationId,
            EmployeeId: request.params.id
          }
        });

        if (vacation)
          await vacation.update(request.payload);
      } catch(e) {
        reply(e);
      }

      reply(vacation);
    }
  });
}
