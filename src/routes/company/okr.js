

export default server => {
	let db = server.plugins['hapi-sequelize'].db;
  server.route({
    method: 'GET',
    path: '/v1/okrs',
    async handler(request, reply) {
      let companys = await request.models.OKR.findAll({
        where: request.query
      });

      reply(companys);
    }
  });

	server.route({
		method: 'GET',
		path: '/v1/okrs/{scope}',
		async handler(request, reply) {
			let okrs;
			try {
				okrs = await request.models.OKR.scope(request.params.scope).findAll();
			} catch(e) {
				reply(e);
			}

			reply(okrs);
		}
	});

	server.route({
		method: 'GET',
		path: '/v1/company/{id}/okrs/{scope}',
		async handler(request, reply) {
			let okrs;
			try {
				okrs = await request.models.OKR.scope(request.params.scope).findAll({
					where: {
						CompanyId: request.params.id
					}
				});
			} catch(e) {
				reply(e);
			}

			reply(okrs);
		}
	});

  server.route({
    method: 'GET',
    path: '/v1/company/{id}/okrs',
    async handler(request, reply) {
      let okrs;
      try {
        okrs = await request.models.OKR.findAll({
          CompanyId: request.params.id
        });
      } catch(e) {
        reply(e);
      }

      reply(okrs);
    }
  });

  server.route({
    method: 'GET',
    path: '/v1/company/{id}/okr/{okrId}',
    async handler(request, reply) {
      let okr;
      try {
        okr = await request.models.OKR.findOne({
          where: {
            id: request.params.okrId,
            CompanyId: request.params.id
          }
        });
      } catch(e) {
        reply(e);
      }

      reply(okr);
    }
  });

  server.route({
    method: 'POST',
    path: '/v1/company/{id}/okr',
    async handler(request, reply) {
      try {
        let okr = await request.models.OKR.create({
          CompanyId: request.params.id,
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
    path: '/v1/company/{id}/okr/{okrId}',
    async handler(request, reply) {
      try {
        let okr = await request.models.OKR.findOne({
          where: {
            id: request.params.okrId,
            CompanyId: request.params.id
          }
        });

        if (okr)
          await okr.destroy();
      } catch(e) {
        reply(e);
      }

      reply();
    }
  });

  server.route({
    method: 'PUT',
    path: '/v1/company/{id}/okr/{okrId}',
    async handler(request, reply) {
      let okr;
      try {
        okr = await request.models.OKR.findOne({
          where: {
            id: request.params.okrId,
            CompanyId: request.params.id
          }
        });

        if (okr)
          await okr.update(request.payload);
      } catch(e) {
        reply(e);
      }

      reply(okr);
    }
  });
}
