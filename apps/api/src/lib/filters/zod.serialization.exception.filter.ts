import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { ApiErrorResponse, ZodError, z } from '@repo/schemas'
import { ZodSerializationException } from 'nestjs-zod'

@Catch(ZodSerializationException)
export class ZodSerializationExceptionFilter implements ExceptionFilter {
	catch(exception: ZodSerializationException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse()
		const status = exception.getStatus()
		const zodErr: ZodError = exception.getZodError() as ZodError
		const error: ApiErrorResponse = {
			error: {
				type: 'SerializationException',
				message: 'Erro ao processar a resposta do servidor',
				details: z.flattenError(zodErr).formErrors[0]
			}
		}

		response.status(status).json(error)
	}
}
