import type { Prisma } from '@repo/database'
import { z } from 'zod'
import type { ApiSuccessResponse } from '../api/api.response.types.js'

export const createDocumentSchema = z.strictObject({
	title: z.string().trim().nonempty().max(50),
	content: z.string().trim()
}) satisfies z.ZodType<Prisma.DocumentCreateInput>

export const updateDocumentSchema = createDocumentSchema.partial()

export const documentSchema = z.strictObject({
	id: z.uuid(),
	...createDocumentSchema.shape,
	updatedAt: z.coerce.date(),
	createdAt: z.coerce.date()
}) satisfies z.ZodType<Prisma.DocumentModel>

export const documentResponseSchema = z.strictObject({
	data: documentSchema
}) satisfies z.ZodType<ApiSuccessResponse<Prisma.DocumentModel>>

export type DocumentSchema = z.infer<typeof documentSchema>
export type DocumentResponseSchema = z.infer<typeof documentResponseSchema>
export type CreateDocumentSchema = z.infer<typeof createDocumentSchema>
export type UpdateDocumentSchema = z.infer<typeof updateDocumentSchema>
