import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CustomPrismaModule } from 'nestjs-prisma/dist/custom'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { config, validate } from './lib/config/env'
import { prisma } from './lib/extensions/prisma.extension'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [config],
			validate
		}),
		CustomPrismaModule.forRootAsync({
			name: 'PrismaService',
			useFactory: () => {
				return prisma
			}
		}),
		UsersModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
