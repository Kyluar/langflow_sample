import { INestApplication } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { Test } from '@nestjs/testing'
import { AppModule } from 'src/app.module'
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
