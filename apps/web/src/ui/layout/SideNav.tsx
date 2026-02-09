type SideNavProps = {
	children: React.ReactNode
	className?: string
}

export default function SideNav({
	children,
	className = '',
	...props
}: SideNavProps) {
	return (
		<aside id="web-sidenav" className={className} {...props}>
			{children}
		</aside>
	)
}
