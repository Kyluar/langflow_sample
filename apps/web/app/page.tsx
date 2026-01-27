import Image from 'next/image'
import { Logo } from '@repo/ui/logo'
import Link from 'next/link'

export default function Home() {
	const menuItems = [
		{ id: 'item-1', label: 'item-1' },
		{ id: 'item-2', label: 'item-2' },
		{ id: 'item-3', label: 'item-3' },
		{ id: 'item-4', label: 'item-4' },
		{ id: 'item-5', label: 'item-5' },
		{ id: 'item-6', label: 'item-6' },
		{ id: 'item-7', label: 'item-7' }
	]

	return (
		<div className="flex min-h-screen font-sans selection:bg-ctd-azul-02/20 bg-ctd-fundo">
			{/* HEADER */}
			<header className="bg-gradient-to-b from-ctd-azul-01 to-ctd-azul-02 py-16 px-6 text-center text-white shadow-md w-72 flex flex-col items-center">
				<div className="mb-8 p-4 flex justify-center">
					<div className="font-black text-2xl tracking-tighter">
						<Logo color="white" />
					</div>
				</div>

				<h1 className="text-xl font-bold tracking-tight mb-5 border-b-[2] border-white/20 pb-4">
					Manual do Desenvolvedor
				</h1>

				<nav className="w-full space-y-4">
					{menuItems.map((item) => (
						<Link
							key={item.id}
							href={`/${item.id}`}
							className="group relative flex items-center justify-center py-3 px-4 rounded-lg overflow-hidden transition-all duration-300"
						>
							{/* O Fundo Animado */}
							<span className="absolute inset-0 bg-white/15 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center"></span>

							{/* O Texto */}
							<span className="relative z-10 text-xl font-medium group-hover:scale-105 transition-transform duration-300">
								{item.label}
							</span>
						</Link>
					))}
				</nav>
			</header>

			{/* MAIN */}
			<main className="flex-grow container mx-auto px-10 py-12">
				<div className="bg-white p-10 rounded-2xl shadow-sm border border-ctd-azul-02/20">
					<h2 className="text-3xl font-bold text-ctd-azul-01 mb-6">
						Conteúdo Principal
					</h2>
					<p className="text-ctd-cinza leading-relaxed">
						Selecione um item no menu lateral para visualizar as diretrizes e
						ferramentas do projeto.
					</p>
				</div>
			</main>
		</div>
	)
}
