import { mockDocs } from '../../service/mockData'
import { MarkDown } from '../../_components/MarkDown'

export default async function DocPage({
	params
}: {
	params: Promise<{ id: string }>
}) {
	// Busca o documento correto no mock baseado no ID da URL
	const { id } = await params
	const doc = mockDocs.find((item) => item.id === id)

	if (!doc) {
		return <h2 className="text-2xl font-bold text-gray-400">Error 404.</h2>
	}

	return (
		<article className="prose prose-slate max-w-none">
			{/* Header da Página */}
			<div className="mb-8 border-b border-gray-100 pb-4">
				<h2 className="text-4xl font-extrabold text-ctd-azul-01 mt-2 mb-3">
					{doc.title}
				</h2>
				<p className="text-xs text-gray-400">
					Última atualização:{' '}
					{new Date(doc.updatedAt).toLocaleDateString('pt-BR')}
				</p>
			</div>

			{/* Renderizador de Markdown */}
			<div className="text-ctd-cinza leading-relaxed">
				<MarkDown content={doc.content} docId={doc.id} />
			</div>
		</article>
	)
}
