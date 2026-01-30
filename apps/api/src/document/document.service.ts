import { Injectable } from '@nestjs/common';
import type { IDocumentService } from 'src/lib/types/interfaces/document.inteface';
import { DocumentRepository } from './document.repository';

@Injectable()
export class DocumentService implements IDocumentService {
    constructor(private repository: DocumentRepository) { }

    getDocuments() {
        return this.repository.documents({ orderBy: { createdAt: 'asc' } })
    }

    getDocumentById(id: string) {
        return this.repository.document({ id })
    }

    createDocument(data: any) {
        return this.repository.createDocument(data)
    }

    updateDocumentById(id: string, data: any) {
        return this.repository.updateDocument({ where: { id }, data })
    }

    deleteDocumentById(id: string) {
        return this.repository.deleteDocument({ id })
    }
}
