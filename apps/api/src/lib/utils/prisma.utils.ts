import { ConfigService } from '@nestjs/config'
import { PrismaClient, PrismaPg } from '@repo/database'

export function PrismaClientFactory(config: ConfigService) {
	const connectionString = config.getOrThrow('DATABASE_URL')
	console.log({ connectionString })
	const adapter = new PrismaPg({ connectionString })
	return new PrismaClient({ adapter })
}
