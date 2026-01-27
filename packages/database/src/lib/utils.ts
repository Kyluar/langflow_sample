import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../src/generated/prisma/client.js'

export function generateDatabaseUrl(): string{
	const {
		POSTGRES_USER,
		POSTGRES_PASSWORD,
		POSTGRES_HOST,
		POSTGRES_PORT,
		POSTGRES_DB,
		POSTGRES_DB_SCHEMA
	} = process.env
	
	return `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=${POSTGRES_DB_SCHEMA}`
}

export function PrismaClientFactory() {
	const DATABASE_URL = generateDatabaseUrl()
	const connectionString = `${DATABASE_URL}`
	const adapter = new PrismaPg({ connectionString })
	return new PrismaClient({ adapter })
}
