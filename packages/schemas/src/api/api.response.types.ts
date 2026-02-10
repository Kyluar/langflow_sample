import type { DataType } from '../common/common.types.js'

type ZodFlattenError<T = unknown> = {
	formErrors: string[]
	fieldErrors: Record<keyof T, string[]> | Record<string, string[]>
}

export type ApiErrorResponse<T = unknown> = {
	statusCode: number
	message: string
	error?: string
	errors?: ZodFlattenError<T>
	prismaCode?: string
}

export type ApiResponse<T extends DataType> = {
	statusCode: number
	data: T
}
