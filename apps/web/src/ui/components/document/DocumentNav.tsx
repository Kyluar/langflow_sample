import { Suspense } from 'react'
import { CreateDocButton } from '../CreateDocButton'
import DocumentList from './DocumentList'
import DocumentListSkeleton from './DocumentListSkeleton'

export default function DocumentNav() {
	return (
		<nav className="px-1 py-4 w-[15vw] min-w-[300px] text-white">
			<div className="text-center">
				<Suspense fallback={<DocumentListSkeleton />}>
					<DocumentList />
				</Suspense>
			</div>
			<CreateDocButton />
		</nav>
	)
}
