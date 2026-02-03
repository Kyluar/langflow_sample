import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client'
import { seedDocuments, seedUsers } from '../src/lib/seed/data'
import { generateDatabaseUrl, seedDatabase } from '../src/lib/utils'

const connectionString = generateDatabaseUrl()
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
	await seedDatabase({
		prisma,
		models: {
			// biome-ignore-start lint/suspicious/noExplicitAny: Required
			user: {
				data: seedUsers,
				whereCb: (item: any) => ({ email: item.email })
			},
			document: {
				data: seedDocuments,
				whereCb: (item: any) => ({ title: item.title })
			}
			// biome-ignore-end lint/suspicious/noExplicitAny: Required
		}
	})
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
