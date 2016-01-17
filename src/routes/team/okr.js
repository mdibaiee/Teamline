export default server => {
	let db = server.plugins['hapi-sequelize'].db;

  server.route({
    method: 'GET',
    path: '/v1/team/{id}/okrs',
    async handler(request, reply) {
      let okrs;
      try {
        okrs = await request.models.OKR.findAll({
          TeamId: request.params.id
        });
      } catch(e) {
        reply(e);
      }

      reply(okrs);
    }
  });

  server.route({
    method: 'GET',
    path: '/v1/team/{id}/okr/{okrId}',
    async handler(request, reply) {
      let okr;
      try {
        okr = await request.models.OKR.findOne({
          where: {
            id: request.params.okrId,
            TeamId: request.params.id
          }
        });
      } catch(e) {
        reply(e);
      }

      reply(okr);
    }
  });

	server.route({
		method: 'GET',
		path: '/v1/team/{id}/okrs/{scope}',
		async handler(request, reply) {
			let okrs;
			try {
				okrs = await request.models.OKR.scope(request.params.scope).findAll({
					where: {
						TeamId: request.params.id
					}
				});
			} catch(e) {
				reply(e);
			}

			reply(okrs);
		}
	});

  server.route({
    method: 'POST',
    path: '/v1/team/{id}/okr',
    async handler(request, reply) {
      try {
        let okr = await request.models.OKR.create({
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
    path: '/v1/team/{id}/okr/{okrId}',
    async handler(request, reply) {
      try {
        let okr = await request.models.OKR.findOne({
          where: {
            id: request.params.okrId,
            TeamId: request.params.id
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
    path: '/v1/team/{id}/okr/{okrId}',
    async handler(request, reply) {
      let okr;
      try {
        okr = await request.models.OKR.findOne({
          where: {
            id: request.params.okrId,
            TeamId: request.params.id
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
