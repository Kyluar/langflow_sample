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
import { RESOURCES } from '@repo/constants'
import { DocumentSchema } from '@repo/schemas'
import {
	CreateDocumentDto,
	UpdateDocumentDto
} from 'src/lib/types/dto/document.dto'
import { DocumentService } from './document.service'

@Controller(RESOURCES.DOCUMENTS)
export class DocumentController {
	constructor(private readonly service: DocumentService) {}

	@Get(':id')
	getDocumentById(
		@Param('id', ParseUUIDPipe) id: string
	): Promise<DocumentSchema> {
		return this.service.getDocumentById(id)
	}

	@Get('/title/:title')
	getDocumentByTitle(
		@Param('title') title: string
	): Promise<DocumentSchema> {
		return this.service.getDocumentByTitle(title)
	}

	@Get()
	getDocuments(): Promise<DocumentSchema[]> {
		return this.service.getDocuments()
	}

	@Post()
	// @ZodResponse({ type: DocumentDto }): Causes error with zod v4
	createDocument(
		@Body() documentData: CreateDocumentDto
	): Promise<DocumentSchema> {
		return this.service.createDocument(documentData)
	}

	@Patch(':id')
	// @ZodResponse({ type: DocumentDto }): Causes error with zod v4
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
