export function generateDatabaseUrl(): string {
	const {
		POSTGRES_USER,
		POSTGRES_PASSWORD,
		POSTGRES_HOST,
		POSTGRES_PORT,
		POSTGRES_DB_NAME,
		POSTGRES_DB_SCHEMA
	} = process.env

	return `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB_NAME}?schema=${POSTGRES_DB_SCHEMA}`
}
