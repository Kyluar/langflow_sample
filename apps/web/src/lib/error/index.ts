import type { ApiErrorResponse, ApiResponse, DataType } from '@repo/schemas'
import axios, { type AxiosResponse } from 'axios'

export async function asyncApiTryCatch<T extends DataType>(
	promise: Promise<AxiosResponse<ApiResponse<T>>>
): Promise<ApiResponse<T>> {
	try {
		return (await promise).data
	} catch (err) {
		return handleApiError(err)
	}
}

function handleApiError(err: unknown): ApiErrorResponse {
	const defaultErr: ApiErrorResponse = {
		error: {
			type: 'API_ERROR',
			message: 'Erro da api não tratado, vejo o log para mais detalhes',
			details: 'Erro interno ou de rede, vejo o log para mais detalhes'
		}
	}

	if (axios.isAxiosError(err)) {
		if (err.response) {
			return err.response.data
		}
	}

	console.error('asyncTryCatch:', err)
	return defaultErr
}
