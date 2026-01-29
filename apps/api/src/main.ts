import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const PORT = app.get(ConfigService).getOrThrow('PORT')

	await app.listen(PORT)
	console.info(`Running on port ${PORT}`)
}
bootstrap()
