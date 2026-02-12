'use server'

import { RESOURCES } from '@repo/constants'
import type {
	CreateDocumentSchema,
	DataType,
	DocumentSchema
} from '@repo/schemas'
import { revalidatePath } from 'next/cache'
import { apiRequest } from '../api'

type ActionReturn<T extends DataType> = {
	message: string
	data: T | null
}

export async function createDocAction(
	data: CreateDocumentSchema,
	successMessage: string
): Promise<ActionReturn<DocumentSchema>> {
	const actionReturn: ActionReturn<DocumentSchema> = {
		data: null,
		message: successMessage
	}

	const apiRes = await apiRequest<DocumentSchema, CreateDocumentSchema>(
		'post',
		`/${RESOURCES.DOCUMENTS}`,
		data
	)

	if ('error' in apiRes) actionReturn.message = apiRes.error.message
	if ('errors' in apiRes)
		// biome-ignore lint/style/noNonNullAssertion: Just ignore Biome here
		actionReturn.message = apiRes.errors[0]!.message

	if ('data' in apiRes) {
		revalidatePath('/', 'layout')
		actionReturn.data = apiRes.data
	}
	return actionReturn
}
