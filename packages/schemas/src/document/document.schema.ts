import type { Prisma } from '@repo/database'
import { z } from 'zod'
import type { ApiResponse } from '../api/api.response.types.js'

export const createDocumentSchema = z.strictObject({
	title: z.string(),
	content: z.string()
}) satisfies z.ZodType<Prisma.DocumentCreateInput>

export const updateDocumentSchema = createDocumentSchema.partial()

export const documentSchema = z.strictObject({
	id: z.uuid(),
	...createDocumentSchema.shape,
	updatedAt: z.coerce.date(),
	createdAt: z.coerce.date()
}) satisfies z.ZodType<Prisma.DocumentModel>

export const documentResponseSchema = z.strictObject({
	statusCode: z.number(),
	data: documentSchema
}) satisfies z.ZodType<ApiResponse<Prisma.DocumentModel>>

export type DocumentSchema = z.infer<typeof documentSchema>
export type DocumentResponseSchema = z.infer<typeof documentResponseSchema>
export type CreateDocumentSchema = z.infer<typeof createDocumentSchema>
export type UpdateDocumentSchema = z.infer<typeof updateDocumentSchema>
