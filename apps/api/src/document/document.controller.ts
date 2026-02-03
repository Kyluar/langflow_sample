import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Post
} from '@nestjs/common'
import { DocumentSchema } from '@repo/schemas'
import { ZodResponse } from 'nestjs-zod'
import {
	CreateDocumentDto,
	DocumentDto,
	UpdateDocumentDto
} from 'src/lib/types/dto/document.dto'
import { DocumentService } from './document.service'

@Controller('document')
export class DocumentController {
	constructor(private readonly service: DocumentService) {}

	@Get(':id')
	getDocumentById(
		@Param('id', ParseUUIDPipe) id: string
	): Promise<DocumentSchema> {
		return this.service.getDocumentById(id)
	}

	@Get()
	getDocuments(): Promise<DocumentSchema[]> {
		return this.service.getDocuments()
	}

	@Post()
	@ZodResponse({ type: DocumentDto })
	createDocument(
		@Body() documentData: CreateDocumentDto
	): Promise<DocumentSchema> {
		return this.service.createDocument(documentData)
	}

	@Patch(':id')
	@ZodResponse({ type: DocumentDto })
	updateDocument(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() data: UpdateDocumentDto
	): Promise<DocumentSchema> {
		return this.service.updateDocumentById(id, data)
	}

	@Delete(':id')
	deleteDocument(
		@Param('id', ParseUUIDPipe) id: string
	): Promise<DocumentSchema> {
		return this.service.deleteDocumentById(id)
	}
}
