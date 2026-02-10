import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { ApiErrorResponse, ZodError, z } from '@repo/schemas'
import { ZodValidationException } from 'nestjs-zod'

@Catch(ZodValidationException)
export class ZodValidationExceptionFilter implements ExceptionFilter {
	catch(exception: ZodValidationException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse()
		const status = exception.getStatus()
		const error: ZodError = exception.getZodError() as ZodError

		response.status(status).json({
			statusCode: status,
			message: 'Validação falhou',
			errors: z.flattenError(error)
		} as ApiErrorResponse<unknown>)
	}
}
