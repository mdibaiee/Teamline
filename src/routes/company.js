

export default server => {
  server.route({
    method: 'GET',
    path: '/v1/companies',
    async handler(request, reply) {
      let companys = await request.models.Company.findAll({
        where: request.query
      });

      reply(companys);
    }
  });

	server.route({
		method: 'GET',
		path: '/v1/companies/{scope}',
		async handler(request, reply) {
			let actions;
			try {
				actions = await request.models.Company.scope(request.params.scope).findAll();
			} catch(e) {
				reply(e);
			}

			reply(actions);
		}
	});

  server.route({
    method: 'GET',
    path: '/v1/company/{id}',
    async handler(request, reply) {
      let company = await request.models.Company.findOne({
        where: {
          id: request.params.id
        }
      });

      reply(company);
    }
  });

  server.route({
    method: 'POST',
    path: '/v1/company',
    async handler(request, reply) {
      try {
        let company = await request.models.Company.create(request.payload);
      } catch(e) {
        reply(e);
      }

      reply();
    }
  });

  server.route({
    method: 'DELETE',
    path: '/v1/company/{id}',
    async handler(request, reply) {
      try {
        let company = await request.models.Company.findOne({
          where: {
            id: request.params.id
          }
        });

        await company.destroy();
      } catch(e) {
        reply(e);
      }

      reply();
    }
  });

  server.route({
    method: 'PUT',
    path: '/v1/company/{id}',
    async handler(request, reply) {
      try {
        let company = await request.models.Company.findOne({
          where: {
            id: request.params.id
          }
        });

        await company.update(request.payload);
      } catch(e) {
        reply(e);
      }

      reply();
    }
  })
}
