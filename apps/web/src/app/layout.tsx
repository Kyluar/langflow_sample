import { requestData } from '@/lib/api'
import '@/styles/globals.css'
import { CreateDocButton } from '@/ui/components/CreateDocButton'
import DocumentList from '@/ui/components/DocumentList'
import { DocumentListSkeleton } from '@/ui/components/DocumentListSkeleton'
import { SidebarWrapper } from '@/ui/components/SidebarWrapper'
import { ToasterContext } from '@/ui/components/ToasterProvider'
import { RESOURCES } from '@repo/constants'
import type { DocumentSchema } from '@repo/schemas'
import { Logo } from '@repo/ui/logo'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

export default async function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	const documentsPromise = requestData<DocumentSchema[]>(RESOURCES.DOCUMENTS)

	return (
		<html lang="pt-BR">
			<body className="flex h-screen overflow-hidden font-sans bg-ctd-fundo">
				<ToasterContext />

				<SidebarWrapper>
					<header className="bg-gradient-to-b from-ctd-azul-01 to-ctd-azul-02 py-16 px-6 text-center text-white shadow-md flex flex-col items-center min-h-screen w-full overflow-y-auto scrollbar-light">
						<div className="mb-8 p-4 flex justify-center">
							<div className="font-black text-2xl tracking-tighter">
								<Logo color="white" />
							</div>
						</div>
						<h1 className="text-xl font-bold tracking-tight mb-5 border-b-[2] border-white/20 pb-4">
							Manual do Desenvolvedor
						</h1>

						<Suspense fallback={<DocumentListSkeleton />}>
							<DocumentList documentsPromise={documentsPromise} />
						</Suspense>
						<CreateDocButton />
					</header>
				</SidebarWrapper>

				<main className="flex-grow overflow-y-auto relative">
					<div>{children}</div>
				</main>
			</body>
		</html>
	)
}
