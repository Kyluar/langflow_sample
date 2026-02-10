import type { Prisma } from '@repo/database'
import type { ApiResponse, DocumentSchema } from '@repo/schemas'
import type { CreateDocumentDto, UpdateDocumentDto } from '../dto/document.dto'

export type GetDocumentsParams = {
	skip?: number
	take?: number
	cursor?: Prisma.DocumentWhereUniqueInput
	where?: Prisma.DocumentWhereInput
	orderBy?: Prisma.DocumentOrderByWithRelationInput
}

export type UpdateDocumentParams = {
	where: Prisma.DocumentWhereUniqueInput
	data: Prisma.DocumentUpdateInput
}

export interface IDocumentRepository {
	document(
		documentWhereUniqueInput: Prisma.DocumentWhereUniqueInput
	): Promise<DocumentSchema>
	documents(params: GetDocumentsParams): Promise<DocumentSchema[]>
	createDocument(data: CreateDocumentDto): Promise<DocumentSchema>
	updateDocument(params: UpdateDocumentParams): Promise<DocumentSchema>
	deleteDocument(
		where: Prisma.DocumentWhereUniqueInput
	): Promise<DocumentSchema>
}

export interface IDocumentService {
	getDocuments(): Promise<DocumentSchema[]>
	getDocumentById(id: string): Promise<DocumentSchema>
	createDocument(data: CreateDocumentDto): Promise<DocumentSchema>
	updateDocumentById(
		id: string,
		data: UpdateDocumentDto
	): Promise<DocumentSchema>
	deleteDocumentById(id: string): Promise<DocumentSchema>
}

export interface IDocumentController {
	getDocuments(): Promise<ApiResponse<DocumentSchema[]>>
	createDocument(data: CreateDocumentDto): Promise<ApiResponse<DocumentSchema>>
	getDocumentById(id: string): Promise<ApiResponse<DocumentSchema>>
	updateDocument(
		id: string,
		data: UpdateDocumentDto
	): Promise<ApiResponse<DocumentSchema>>
	deleteDocument(id: string): Promise<ApiResponse<DocumentSchema>>
}
