// biome-ignore-all lint/correctness/useHookAtTopLevel: Conflict
import { join } from 'node:path'
import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { setupSwagger } from './lib/config/swagger'
import {
	PrismaClientExceptionFilter,
	ZodSerializationExceptionFilter,
	ZodValidationExceptionFilter
} from './lib/filters'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)
	app.useStaticAssets(join(__dirname, '..', 'public'))

	const { httpAdapter } = app.get(HttpAdapterHost)
	const PORT = app.get(ConfigService).getOrThrow('API_PORT')

	setupSwagger(app)

	app.useGlobalFilters(new ZodValidationExceptionFilter())
	app.useGlobalFilters(new ZodSerializationExceptionFilter())
	app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

	await app.listen(PORT)
	console.info(`Running on port ${PORT}`)
}
bootstrap()
