import { INestApplication } from '@nestjs/common'
import { CustomPrismaClient } from 'src/lib/extensions/prisma.extension'

export async function teardownTestEnvironment(
	app: INestApplication
): Promise<void> {
	try {
		const prismaService = app.get<CustomPrismaClient>('PrismaService')
		await prismaService.client.$disconnect()
		await app.close()
	} catch (err) {
		console.error(err)
		throw new Error('Failed to teardown test environment')
	}
}
