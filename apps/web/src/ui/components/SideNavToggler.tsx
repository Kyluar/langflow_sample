'use client'

import { Menu } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

type SideNavTogglerProps = {
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function SideNavToggler({ setIsOpen }: SideNavTogglerProps) {
	function handleOnClick() {
		setIsOpen((pv) => !pv)
	}

	return (
		<button type="button" className="sidenav-toggler" onClick={handleOnClick}>
			<Menu />
		</button>
	)
}
