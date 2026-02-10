import { ArgumentsHost, Catch } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { generatePrismaExceptionResponse, Prisma } from '@repo/database'
import { ApiErrorResponse } from '@repo/schemas'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
	catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse()
		const excepRes: ApiErrorResponse<unknown> =
			generatePrismaExceptionResponse(exception)

		response.status(excepRes.statusCode).json(excepRes)
	}
}
