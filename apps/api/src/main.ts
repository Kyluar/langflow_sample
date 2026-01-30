// biome-ignore-all lint/correctness/useHookAtTopLevel: Conflict
import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { PrismaClientExceptionFilter } from './lib/filters/prisma.exception.filter'
import { ZodValidationExceptionFilter } from './lib/filters/zod.exception.filter'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const { httpAdapter } = app.get(HttpAdapterHost)
	const PORT = app.get(ConfigService).getOrThrow('PORT')

	const config = new DocumentBuilder()
		.setTitle('CTD Resource API')
		.setDescription('Documentação da API da aplicação CTD Resource')
		.setVersion('1.0')
		.build()

	const documentFactory = () => SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api', app, documentFactory, {
		jsonDocumentUrl: 'api/json'
	})

	app.useGlobalFilters(new ZodValidationExceptionFilter())
	app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

	await app.listen(PORT)
	console.info(`Running on port ${PORT}`)
}
bootstrap()
