import api from '@/lib/config/axios'
import type { ApiResponse, DataType } from '@repo/schemas'
import type { AxiosResponse } from 'axios'
import { asyncApiTryCatch } from '../error'

export async function apiRequest<T extends DataType>(
	url: string
): Promise<ApiResponse<T>> {
	return asyncApiTryCatch(api.get<ApiResponse<T>>(url))
}

export async function apiSendRequest<T extends DataType, D extends DataType>(
	url: string,
	data: D
): Promise<ApiResponse<T>> {
	return asyncApiTryCatch(
		api.post<ApiResponse<T>, AxiosResponse<ApiResponse<T>>, D>(url, data)
	)
}
