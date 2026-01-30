// biome-ignore-all lint/correctness/useHookAtTopLevel: Conflict
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ZodValidationExceptionFilter } from './lib/filters/zod.exception.filter'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const PORT = app.get(ConfigService).getOrThrow('PORT')
	app.useGlobalFilters(new ZodValidationExceptionFilter())
	await app.listen(PORT)
	console.info(`Running on port ${PORT}`)
}
bootstrap()
