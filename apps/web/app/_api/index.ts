import type { ApiResponse, DataType } from '@repo/schemas'
import api from '../config/axios'

export async function requestData<T extends DataType>(
	url: string
): Promise<ApiResponse<T>> {
	return (await api.get<ApiResponse<T>>(url)).data
}
