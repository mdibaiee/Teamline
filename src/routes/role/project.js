

export default server => {
	let db = server.plugins['hapi-sequelize'].db;
  server.route({
    method: 'GET',
    path: '/v1/projects',
    async handler(request, reply) {
      let roles = await request.models.Project.findAll({
        where: request.query
      });

      reply(roles);
    }
  });

	server.route({
		method: 'GET',
		path: '/v1/projects/{scope}',
		async handler(request, reply) {
			let projects;
			try {
				projects = await request.models.Project.scope(request.params.scope).findAll();
			} catch(e) {
				reply(e);
			}

			reply(projects);
		}
	});

	server.route({
		method: 'GET',
		path: '/v1/role/{id}/projects/{scope}',
		async handler(request, reply) {
			let projects;
			try {
				projects = await request.models.Project.scope(request.params.scope).findAll({
					where: {
						RoleId: request.params.id
					}
				});
			} catch(e) {
				reply(e);
			}

			reply(projects);
		}
	});


  server.route({
    method: 'GET',
    path: '/v1/role/{id}/projects',
    async handler(request, reply) {
      let projects;
      try {
        projects = await request.models.Project.findAll({
          RoleId: request.params.id
        });
      } catch(e) {
        reply(e);
      }

      reply(projects);
    }
  });

  server.route({
    method: 'GET',
    path: '/v1/role/{id}/project/{projectId}',
    async handler(request, reply) {
      let project;
      try {
        project = await request.models.Project.findOne({
          where: {
            id: request.params.projectId,
            RoleId: request.params.id
          }
        });
      } catch(e) {
        reply(e);
      }

      reply(project);
    }
  });

  server.route({
    method: 'POST',
    path: '/v1/role/{id}/project',
    async handler(request, reply) {
      try {
        let project = await request.models.Project.create({
          RoleId: request.params.id,
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
    path: '/v1/role/{id}/project/{projectId}',
    async handler(request, reply) {
      try {
        let project = await request.models.Project.findOne({
          where: {
            id: request.params.projectId,
            RoleId: request.params.id
          }
        });

        if (project)
          await project.destroy();
      } catch(e) {
        reply(e);
      }

      reply();
    }
  });

  server.route({
    method: 'PUT',
    path: '/v1/role/{id}/project/{projectId}',
    async handler(request, reply) {
      let project;
      try {
        project = await request.models.Project.findOne({
          where: {
            id: request.params.projectId,
            RoleId: request.params.id
          }
        });

        if (project)
          await project.update(request.payload);
      } catch(e) {
        reply(e);
      }

      reply(project);
    }
  });
}
