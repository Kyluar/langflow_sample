import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CustomPrismaModule } from 'nestjs-prisma/dist/custom'
import { config, validate } from './lib/config/env'
import { prisma } from './lib/extensions/prisma.extension'
import { UsersModule } from './users/users.module'
import { APP_PIPE, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core'
import { ZodValidationPipe, ZodSerializerInterceptor } from 'nestjs-zod'
import { HttpExceptionFilter } from './lib/filters/http.exception.filter'

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
	],
	providers: [
		{
			provide: APP_PIPE,
			useClass: ZodValidationPipe
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ZodSerializerInterceptor
		},
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter
		}
	]
})
export class AppModule {}
