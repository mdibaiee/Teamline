export default (server) => {
  server.route({
    method: 'GET',
    path: '/',
    handler(request, reply) {
      if (request.query.hasOwnProperty('refresh')) {
        server.emit('refresh');
        reply();
      }
    },
  });
};
