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
// biome-ignore lint/style/useImportType: Required
import { DocumentService } from './document.service'
import type { DocumentSchema } from '@repo/schemas'

@Controller('document')
export class DocumentController {
    constructor(private readonly service: DocumentService) { }

    @Get(':id')
    getDocumentById(@Param('id', ParseUUIDPipe) id: string): Promise<DocumentSchema> {
        return this.service.getDocumentById(id)
    }

    @Get()
    getDocuments(): Promise<DocumentSchema[]> {
        return this.service.getDocuments()
    }

    @Post()
    createDocument(@Body() userData: DocumentSchema): Promise<DocumentSchema> {
        return this.service.createDocument(userData)
    }

    @Patch(':id')
    updateDocument(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() data: DocumentSchema
    ): Promise<DocumentSchema> {
        return this.service.updateDocumentById(id, data)
    }

    @Delete(':id')
    deleteDocument(@Param('id', ParseUUIDPipe) id: string): Promise<DocumentSchema> {
        return this.service.deleteDocumentById(id)
    }
}
