import { Logo } from '@repo/ui/logo'
import { mockDocs } from './service/mockData'
import Link from 'next/link'
import './globals.css'

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="pt-br">
			<body className="flex h-screen overflow-hidden font-sans bg-ctd-fundo">
				<header
					className="bg-gradient-to-b from-ctd-azul-01 to-ctd-azul-02
	           py-16 px-6 text-center text-white shadow-md
	           flex flex-col items-center
	           min-h-screen w-[340px] flex-shrink-0 overflow-y-auto"
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
					<nav className="w-full space-y-2.5">
						{mockDocs.map((item) => (
							<Link
								key={item.id}
								href={`/docs/${item.id}`}
								className="group relative flex items-center justify-center py-3 px-4 rounded-lg overflow-hidden transition-all duration-300"
							>
								<span className="absolute inset-0 bg-white/15 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center"></span>
								<span className="relative z-10 text-lg font-medium group-hover:scale-105 transition-transform duration-300">
									{item.label}
								</span>
							</Link>
						))}
					</nav>
				</header>

				{/* Main Content */}
				<main className="flex-grow overflow-y-auto px-10 py-12 bg-white">
					<div>{children}</div>
				</main>
			</body>
		</html>
	)
}
