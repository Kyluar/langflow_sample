import { defineConfig } from 'prisma/config'
import { generateDatabaseUrl } from './src/lib/utils'

const DATABASE_URL = generateDatabaseUrl()

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
