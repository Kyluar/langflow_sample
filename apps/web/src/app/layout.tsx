import { requestData } from '@/lib/api'
import '@/styles/globals.css'
import '@/styles/layout.css'
import DocumentLayoutPage from '@/ui/pages/DocumentLayout'
import { RESOURCES } from '@repo/constants'
import type { DocumentSchema } from '@repo/schemas'
export const dynamic = 'force-dynamic'

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	const documentsPromise = requestData<DocumentSchema[]>(RESOURCES.DOCUMENTS)

	return (
		<html lang="pt-BR">
			<body>
				<DocumentLayoutPage documentsPromise={documentsPromise}>
					{children}
				</DocumentLayoutPage>
			</body>
		</html>
	)
}
