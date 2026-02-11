import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { ZodError } from '@repo/schemas'
import { ZodValidationException } from 'nestjs-zod'
import { createApiResponseErrorFromZodFlattenError } from '../utils/error.utils'
@Catch(ZodValidationException)
export class ZodValidationExceptionFilter implements ExceptionFilter {
	catch(exception: ZodValidationException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse()
		const status = exception.getStatus()
		const zodEx: ZodError = exception.getZodError() as ZodError
		const error = createApiResponseErrorFromZodFlattenError(zodEx)

		response.status(status).json(error)
	}
}
