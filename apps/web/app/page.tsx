export default function Home() {
	return (
		<div className="relative min-h-screen w-full bg-dev bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-center">

			{/* Overlay com um leve desfoque (Glassmorphism) para destacar o texto */}
			<div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-none"></div>

			<div className="relative z-10 px-6 max-w-4xl">
				{/* Texto Extra Grande com tracking (espaçamento entre letras) mais elegante */}
				<h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none drop-shadow-2xl">
					Portal de <br />
					<span className="text-ctd-azul-02">Recursos</span>
				</h2>

				{/* Linha decorativa centralizada */}
				<div className="w-24 h-1.5 bg-ctd-azul-02 mx-auto mb-8 rounded-full"></div>

				<p className="text-xl md:text-2xl text-white/80 font-bold leading-relaxed drop-shadow-md ">
					Selecione um item no menu lateral para visualizar as diretrizes
					e padrões de desenvolvimento.
				</p>
			</div>
		</div>
	)
}