import { Logo } from '@repo/ui/logo'

export default function Header() {
	return (
		<header
			id="web-header"
			className="px-5 py-2 text-white bg-ctd-azul-01 flex flex-column items-center border-b-[1] border-white/50"
		>
			<a href="/" className="me-3">
				<Logo color="white" />
			</a>
			<h1 className="text-xl font-bold tracking-tight">
				Manual do Desenvolvedor
			</h1>
		</header>
	)
}
