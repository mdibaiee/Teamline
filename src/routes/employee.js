export default server => {
  server.route({
    method: 'GET',
    path: '/v1/employees',
    async handler(request, reply) {
      let employees = await request.models.Employee.findAll({
        where: request.query
      });

      reply(employees);
    }
  });

	server.route({
		method: 'GET',
		path: '/v1/employees/{scope}',
		async handler(request, reply) {
			let actions;
			try {
				actions = await request.models.Employee.scope(request.params.scope).findAll();
			} catch(e) {
				reply(e);
			}

			reply(actions);
		}
	});


  server.route({
    method: 'GET',
    path: '/v1/employee/{id}',
    async handler(request, reply) {
      let employee = await request.models.Employee.findOne({
        where: {
          id: request.params.id
        }
      });

      reply(employee);
    }
  });

  server.route({
    method: 'POST',
    path: '/v1/employee',
    async handler(request, reply) {
      try {
        let employee = await request.models.Employee.create(request.payload);
      } catch(e) {
        reply(e);
      }

      reply();
    }
  });

  server.route({
    method: 'DELETE',
    path: '/v1/employee/{id}',
    async handler(request, reply) {
      try {
        let employee = await request.models.Employee.findOne({
          where: {
            id: request.params.id
          }
        });

        await employee.destroy();
      } catch(e) {
        reply(e);
      }

      reply();
    }
  });

  server.route({
    method: 'PUT',
    path: '/v1/employee/{id}',
    async handler(request, reply) {
      try {
        let employee = await request.models.Employee.findOne({
          where: {
            id: request.params.id
          }
        });

        await employee.update(request.payload);
      } catch(e) {
        reply(e);
      }

      reply();
    }
  })
}
