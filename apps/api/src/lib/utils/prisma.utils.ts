import { generateDatabaseUrl, PrismaClient, PrismaPg } from '@repo/database'

export function PrismaClientFactory() {
	const connectionString = generateDatabaseUrl()
	const adapter = new PrismaPg({ connectionString })
	return new PrismaClient({ adapter })
}
