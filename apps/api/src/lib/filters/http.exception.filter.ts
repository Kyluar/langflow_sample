import {
	type ArgumentsHost,
	Catch,
	HttpException,
	Logger
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { ApiErrorResponse, ZodError } from '@repo/schemas'
import { ZodSerializationException } from 'nestjs-zod'

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter {
	private readonly logger = new Logger(HttpExceptionFilter.name)

	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse()
		const status = exception.getStatus()
		const exceptionResponse = exception.getResponse()

		if (exception instanceof ZodSerializationException) {
			const zodError = exception.getZodError()
			if (zodError instanceof ZodError) {
				this.logger.error(`ZodSerializationException: ${zodError.message}`)
			}
		}

		const message =
			typeof exceptionResponse === 'object'
				? (exceptionResponse as Record<'message', string>).message ||
					exception.message
				: exceptionResponse

		const errorBody: ApiErrorResponse = {
			error: {
				type: exception.name,
				message: Array.isArray(message) ? 'Validation Error' : message,
				details: Array.isArray(message)
					? message.join(', ')
					: (exceptionResponse as Record<'error', string>).error ||
						'No additional details'
			}
		}

		response.status(status).json(errorBody)
	}
}
