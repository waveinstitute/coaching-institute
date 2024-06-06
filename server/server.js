/** @format */

const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
	console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
	console.log({ name: err.name, message: err.message, err });
	process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);
const DBL = process.env.DATABASE_LOCAL;
console.log(DB);

mongoose
	.connect(DBL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
		deprecationErrors: true,
	})
	.then(() => console.log('DB connection successful!'))
	.catch((err) => console.log('an error occoured', err.message));

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
	console.log(`App running peicefully on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
	console.log('UNHANDLED REJECTION! 💥 Shutting down...');
	console.log(err.name, err.message, err);
	server.close(() => {
		process.exit(1);
	});
});
