import { Logo } from '@repo/ui/logo'
import { Suspense } from 'react'
import { CreateDocButton } from './_components/CreateDocButton'
import DocumentList from './_components/DocumentList'
import { DocumentListSkeleton } from './_components/DocumentListSkeleton'
import { ToasterContext } from './_components/ToasterProvider'
import './globals.css'
export const dynamic = 'force-dynamic'

export default async function RootLayout({
	children
}: {
	children: React.ReactNode
}) {

	return (
		<html lang="pt-BR">
			<body className="flex h-screen overflow-hidden font-sans bg-ctd-fundo">
				<ToasterContext />
				<header
					className="bg-gradient-to-b from-ctd-azul-01 to-ctd-azul-02
	           py-16 px-6 text-center text-white shadow-md
	           flex flex-col items-center
	           min-h-screen w-[340px] flex-shrink-0 overflow-y-auto scrollbar-light"
				>
					<div className="mb-8 p-4 flex justify-center">
						<div className="font-black text-2xl tracking-tighter">
							<Logo color="white" />
						</div>
					</div>
					<h1 className="text-xl font-bold tracking-tight mb-5 border-b-[2] border-white/20 pb-4">
						Manual do Desenvolvedor
					</h1>

					{/* Navigation */}
					<Suspense fallback={<DocumentListSkeleton />}>
						<DocumentList />
					</Suspense>
					<CreateDocButton />
				</header>

				{/* Main Content */}
				<main className="flex-grow overflow-y-auto">
					<div>{children}</div>
				</main>
			</body>
		</html>
	)
}
