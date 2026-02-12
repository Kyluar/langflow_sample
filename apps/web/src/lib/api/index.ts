import api from '@/lib/config/axios'
import type { ApiResponse, DataType } from '@repo/schemas'
import type { AxiosResponse } from 'axios'
import { asyncApiTryCatch } from '../error'

type API_METHODS = 'get' | 'post' | 'put' | 'patch' | 'delete'

export async function apiRequest<
	T extends DataType,
	D extends DataType = never
>(method: API_METHODS, url: string, data?: D): Promise<ApiResponse<T>> {
	return asyncApiTryCatch(
		api[method]<ApiResponse<T>, AxiosResponse<ApiResponse<T>>, D>(url, data)
	)
}
