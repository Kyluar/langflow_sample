import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { config, validate } from './lib/config/env'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [config],
			validate
		})
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
