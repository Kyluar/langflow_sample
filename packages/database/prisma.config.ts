import path from 'node:path'
import { config } from 'dotenv'

config({ path: path.resolve(import.meta.dirname, '../../.env') })

import 'dotenv/config'
import { defineConfig } from 'prisma/config'

const {
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_HOST,
	POSTGRES_PORT,
	POSTGRES_DB,
	POSTGRES_DB_SCHEMA
} = process.env

const DATABASE_URL = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=${POSTGRES_DB_SCHEMA}`

export default defineConfig({
	schema: 'prisma/schema.prisma',
	migrations: {
		path: 'prisma/migrations',
		seed: 'tsx prisma/seed.ts'
	},
	datasource: {
		url: DATABASE_URL
	}
})

export { DATABASE_URL }
