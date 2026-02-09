type MainProps = {
	children: React.ReactNode
	className?: string
}

export default function Main({
	children,
	className = '',
	...props
}: MainProps) {
	return (
		<main id="web-main" className={className} {...props}>
			{children}
		</main>
	)
}
