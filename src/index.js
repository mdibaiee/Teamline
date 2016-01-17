import 'babel-polyfill';
import initialize from './initialize';
import routes from './routes';
import config from '../config';

async function start(config) {
	let server = await initialize(config);
	routes(server);

	server.start(() => {
		console.log(`Task tracker server running at: ${server.info.uri}`);
	});
}

if (Object.keys(config).length) start(config);

export default start;
