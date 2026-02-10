'use client'

import '@/styles/globals.css'
import '@/styles/layout.css'

import { useState } from 'react'

import DocumentNav from '@/ui/components/document/DocumentNav'
import Header from '@/ui/layout/Header'
import Main from '@/ui/layout/Main'
import SideNav from '@/ui/layout/SideNav'

export const dynamic = 'force-dynamic'

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	const [open, setIsOpen] = useState(false)

	return (
		<html lang="pt-BR">
			<body>
				<Header setIsOpen={setIsOpen} />
				<SideNav
					className={`bg-gradient-to-b from-ctd-azul-01 to-ctd-azul-02 border-e-[1] border-white/50 ${open ? 'open' : ''}`}
				>
					<DocumentNav />
				</SideNav>
				<Main>{children}</Main>
			</body>
		</html>
	)
}
