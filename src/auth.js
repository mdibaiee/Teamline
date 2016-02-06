export default async (server, register, config, useDefault = true) => {
  await register({
    register: require('hapi-auth-bearer-token'),
  });
  server.auth.strategy('simple', 'bearer-access-token', {
    validateFunc(token, callback) {
      return callback(null, token === config.auth.token, { token });
    }
  });
  if (useDefault) {
    server.auth.default('simple');
  }
};
