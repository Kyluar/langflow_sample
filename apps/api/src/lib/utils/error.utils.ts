import { ApiError, ApiErrorResponse, ZodError, z } from '@repo/schemas'

export function createApiResponseErrorFromZodFlattenError(
	err: ZodError
): ApiErrorResponse {
	const type = 'ValidationException' as const
	const fErr = z.flattenError(err)

	const generateApiError = (message: string, details?: string): ApiError => {
		return { type, message, details } as ApiError
	}

	const formErrors = fErr.formErrors.map((e) =>
		generateApiError(e, 'FormError')
	)

	const fieldErrors = Object.entries(fErr.fieldErrors).flatMap(([f, arr]) =>
		(arr as string[]).map((e) => generateApiError(e, `FieldError em ${f}`))
	)

	const mappedErrors = [...formErrors, ...fieldErrors]

	const error: ApiErrorResponse =
		mappedErrors.length > 1
			? {
					errors: mappedErrors
				}
			: { error: mappedErrors[0] }

	return error
}
