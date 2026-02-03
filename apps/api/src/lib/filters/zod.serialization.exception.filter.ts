import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { ZodError, z } from '@repo/schemas'
import { ZodSerializationException } from 'nestjs-zod'

@Catch(ZodSerializationException)
export class ZodSerializationExceptionFilter implements ExceptionFilter {
	catch(exception: ZodSerializationException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse()
		const status = exception.getStatus()
		const error: ZodError = exception.getZodError() as ZodError

		response.status(status).json({
			statusCode: status,
			message: 'Erro ao processar a resposta do servidor',
			errors: z.flattenError(error).formErrors[0],
			suggestion:
				'Verifique se o retorno da rota está alinhado com o schema esperado'
		})
	}
}
