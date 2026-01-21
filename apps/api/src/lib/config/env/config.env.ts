export default () => ({
	port: parseInt(process.env.PORT || '3001', 10),
	database: {
		host: process.env.POSTGRES_HOST,
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		name: process.env.POSTGRES_DB,
		schema: process.env.POSTGRES_DB_SCHEMA,
		port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
		url: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}?schema=${process.env.POSTGRES_DB_SCHEMA}`
	}
})
