import { PrismaPg } from '@prisma/adapter-pg'
import { DATABASE_URL } from '../../prisma.config'
import { PrismaClient } from '../../src/generated/prisma/client'

export function PrismaClientFactory() {
	const connectionString = `${DATABASE_URL}`
	const adapter = new PrismaPg({ connectionString })
	return new PrismaClient({ adapter })
}
