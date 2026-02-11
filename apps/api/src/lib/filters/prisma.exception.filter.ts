import { ArgumentsHost, Catch } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { generatePrismaExceptionResponse, Prisma } from '@repo/database'
import { ApiErrorResponse } from '@repo/schemas'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
	catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse()

		const { statusCode, ...prismaEx } =
			generatePrismaExceptionResponse(exception)
		const error: ApiErrorResponse = {
			error: {
				type: 'PrismaException',
				message: prismaEx.message,
				details: `PrismaCode (${prismaEx.prismaCode})`
			}
		}

		response.status(statusCode).json(error)
	}
}
