import initialize from './initialize';
import config from '../config';

async function start(config = {}) {
	let server = await initialize(config);

	return new Promise((resolve, reject) => {
		server.start(() => {
			console.log(`Task tracker server running at: ${server.info.uri}`);

			resolve(server);
		});
	})
}

if (Object.keys(config).length) start(config);

export default start;
