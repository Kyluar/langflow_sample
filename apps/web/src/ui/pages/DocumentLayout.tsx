'use client'

import DocumentNav from '@/ui/components/document/DocumentNav'
import Header from '@/ui/layout/Header'
import Main from '@/ui/layout/Main'
import SideNav from '@/ui/layout/SideNav'
import type { ApiResponse, DocumentSchema } from '@repo/schemas'
import { useState } from 'react'

type DocumentLayoutPageProps = {
	children: React.ReactNode
	documentsPromise: Promise<ApiResponse<DocumentSchema[]>>
}

export default function DocumentLayoutPage({
	children,
	documentsPromise
}: DocumentLayoutPageProps) {
	const [open, setIsOpen] = useState(false)

	return (
		<>
			<Header setIsOpen={setIsOpen} />
			<SideNav
				className={`bg-gradient-to-b from-ctd-azul-01 to-ctd-azul-02 border-e-[1] border-white/50 ${open ? 'open' : ''}`}
			>
				<DocumentNav documentsPromise={documentsPromise} />
			</SideNav>
			<Main>{children}</Main>
		</>
	)
}
