import { INestApplication } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { Test } from '@nestjs/testing'
import {
	PrismaClient,
	seedDatabase,
	seedDocuments,
	seedUsers
} from '@repo/database'
import { AppModule } from 'src/app.module'
import { CustomPrismaClient } from 'src/lib/extensions/prisma.extension'
import {
	PrismaClientExceptionFilter,
	ZodSerializationExceptionFilter,
	ZodValidationExceptionFilter
} from 'src/lib/filters'

export async function createApp(): Promise<INestApplication> {
	const moduleRef = await Test.createTestingModule({
		imports: [AppModule]
	}).compile()

	const app = moduleRef.createNestApplication()

	app.enableShutdownHooks()

	const { httpAdapter } = app.get(HttpAdapterHost)
	app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

	app.useGlobalFilters(new ZodSerializationExceptionFilter())

	app.useGlobalFilters(new ZodValidationExceptionFilter())

	await app.init()

	return app
}

async function setupDatabase(prisma: PrismaClient): Promise<void> {
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

export async function setupTestEnvironment(): Promise<INestApplication> {
	const app = await createApp()
	const prismaService = app.get<CustomPrismaClient>('PrismaService')
	await setupDatabase(prismaService.client)
	return app
}
