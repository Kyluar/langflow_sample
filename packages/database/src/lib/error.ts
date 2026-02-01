import type { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'

export function generatePrismaExceptionResponse(
	exception: PrismaClientKnownRequestError
) {
	const info = {
		statusCode: 500,
		prismaCode: exception.code,
		message: 'Erro no banco de dados não tratado'
	}

	switch (exception.code) {
		case 'P2002': {
			info.statusCode = 409
			if (!exception.meta) break
			const model = exception.meta.modelName
			info.message = `Uma restrição de valor único foi violada no modelo ${model}`
			break
		}
		case 'P2025': {
			info.statusCode = 404
			info.message = 'Registro não encontrado'
			break
		}
		case 'P2001': {
			info.statusCode = 404
			info.message = 'O registro não existe na condição especificada'
			break
		}
		case 'P2003': {
			info.statusCode = 400
			info.message = 'Violação de integridade referencial (chave estrangeira)'
			break
		}
		case 'P2000': {
			info.statusCode = 400
			info.message = 'O valor fornecido excede o tamanho máximo permitido'
			break
		}
		case 'P2004': {
			info.statusCode = 400
			info.message = 'Restrição violada no banco de dados'
			break
		}
		case 'P2005': {
			info.statusCode = 400
			info.message = 'Valor inválido para o tipo de campo'
			break
		}
		case 'P2006': {
			info.statusCode = 400
			info.message = 'Valor inválido fornecido'
			break
		}
	}

	return info
}
