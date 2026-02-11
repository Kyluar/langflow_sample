import type { DataType } from '../common/common.types.js'

export type ApiError = {
	type: string
	message: string
	details: string
}

export type ApiErrorResponse =
	| Record<'error', ApiError>
	| Record<'errors', ApiError[]>

export type ApiResponse<T extends DataType> = {
	data: T
}
