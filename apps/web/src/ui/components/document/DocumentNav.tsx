import useApiResponse from '@/lib/hooks/useApiResponse'
import type { ApiResponse, DocumentSchema } from '@repo/schemas'
import { Suspense } from 'react'
import { CreateDocButton } from '../CreateDocButton'
import DocumentList from './DocumentList'
import DocumentListSkeleton from './DocumentListSkeleton'

type DocumentNavProps = {
	documentsPromise: Promise<ApiResponse<DocumentSchema[]>>
}

export default function DocumentNav({ documentsPromise }: DocumentNavProps) {
	const documents = useApiResponse(documentsPromise) || []

	return (
		<nav className="px-1 py-4 w-[15vw] min-w-[300px] text-white">
			<div className="text-center">
				<Suspense fallback={<DocumentListSkeleton />}>
					<DocumentList documents={documents} />
				</Suspense>
			</div>
			<CreateDocButton />
		</nav>
	)
}
