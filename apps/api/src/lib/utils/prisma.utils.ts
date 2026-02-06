import { ConfigService } from '@nestjs/config'
import { PrismaClient, PrismaPg } from '@repo/database'

export function PrismaClientFactory(config: ConfigService) {
	const connectionString = config.getOrThrow('DATABASE_URL')
	const schema = config.getOrThrow('POSTGRES_DB_SCHEMA')

	const adapter = new PrismaPg({ connectionString }, { schema })
	return new PrismaClient({ adapter })
}
