module.exports = {
	client: 'postgresql',
	connection: {
		database: 'remed',
		user: 'postgres',
		password: 'usetudo'
	},
	pool: {
		min: 2,
		max: 10
	 }
};