import '@/styles/globals.css'
import '@/styles/layout.css'

import Header from '@/ui/layout/Header'
import Main from '@/ui/layout/Main'
import SideNav from '@/ui/layout/SideNav'

export const dynamic = 'force-dynamic'

export default async function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="pt-BR">
			<body>
				<Header />
				<SideNav className="bg-gradient-to-b from-ctd-azul-01 to-ctd-azul-02 border-e-[1] border-white/50">
					SideNav
				</SideNav>
				<Main>{children}</Main>
			</body>
		</html>
	)
}
