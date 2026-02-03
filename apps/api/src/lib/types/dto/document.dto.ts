import {
	createDocumentSchema,
	documentSchema,
	updateDocumentSchema
} from '@repo/schemas'
import { createZodDto } from 'nestjs-zod'

export class CreateDocumentDto extends createZodDto(createDocumentSchema) {}
export class UpdateDocumentDto extends createZodDto(updateDocumentSchema) {}
export class DocumentDto extends createZodDto(
	documentSchema.omit({ createdAt: true, updatedAt: true }).strip()
) {}
