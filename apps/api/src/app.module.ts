import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CustomPrismaModule } from 'nestjs-prisma/dist/custom'
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
			isGlobal: true,
			useFactory: () => {
				return prisma
			}
		}),
		UsersModule
	]
})
export class AppModule {}
