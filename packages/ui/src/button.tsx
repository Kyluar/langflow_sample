'use client'

import type { ReactNode } from 'react'

interface ButtonProps {
	children: ReactNode
	className?: string
	appName: string
	onClick: () => void
}

export const Button = ({
	children,
	className,
	appName,
	onClick
}: ButtonProps) => {
	return (
		<button type="button" className={className} onClick={onClick}>
			{children}
		</button>
	)
}
