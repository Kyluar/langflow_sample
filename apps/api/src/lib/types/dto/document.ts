import { createDocumentSchema, updateDocumentSchema } from '@repo/schemas'
import { createZodDto } from 'nestjs-zod'

export class CreateDocumentDto extends createZodDto(createDocumentSchema) { }
export class UpdateDocumentDto extends createZodDto(updateDocumentSchema) { }
