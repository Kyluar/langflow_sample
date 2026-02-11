import { requestData } from '@/lib/api'
import Document from '@/ui/components/document/Documents'
import { RESOURCES } from '@repo/constants'
import type { DocumentSchema } from '@repo/schemas'
import { Suspense } from 'react'

export default async function DocPage({
	params
}: {
	params: Promise<{ title: string }>
}) {
	const { title } = await params

	const documentPromise = requestData<DocumentSchema>(
		`/${RESOURCES.DOCUMENTS}/title/${decodeURIComponent(title)}`
	)

	return (
		<Suspense fallback="Carregando documento...">
			<Document documentPromise={documentPromise} />
		</Suspense>
	)
}
