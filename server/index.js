const app = require('./src/app');
const pool = require('./src/pool');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 8000;

const connect = async () => {
	try {
		await pool.connect({
			host: process.env.DB_HOST,
			port: 21178,
			database: process.env.DATABASE,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			ssl: {
				rejectUnauthorized: false,
			},
		});

		app.listen(port, () => {
			console.log(`You are listening to the port ${port}`);
		});
	} catch (error) {
		console.error(error);
	}
};

connect();
