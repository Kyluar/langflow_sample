import { config } from 'dotenv'
import path from 'node:path'
import { generateDatabaseUrl } from './src/lib/utils'

config({ path: path.resolve(import.meta.dirname, '../../.env.database') })

import 'dotenv/config'
import { defineConfig } from 'prisma/config'

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

export { DATABASE_URL }
