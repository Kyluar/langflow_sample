import { MarkDown } from '../../_components/MarkDown'
import api from '../../config/axios'

interface DocItem {
	id: string
	title: string
	label: string
	category: string
	updatedAt: string
	content: string
}

export default async function DocPage({
	params
}: {
	params: Promise<{ id: string }> //se for id
}) {
	const { id } = await params
	let docs: DocItem | null = null
	try {
		const response = await api.get<DocItem>(`/document/${id}`)
		docs = response.data
	} catch (error) {
		console.log(error)
	}

	if (!docs) {
		return <h2 className="text-2xl font-bold text-gray-400">Error 404.</h2>
	}

	return (
		<article className="prose prose-slate max-w-none">
			{/* Header da Página */}
			<div className="mb-8 border-b border-gray-100 pb-4">
				<h2 className="text-4xl font-extrabold text-ctd-azul-01 mt-2 mb-3">
					{docs.title}
				</h2>
				<p className="text-xs text-gray-400">
					Última atualização: {docs.updatedAt}
				</p>
			</div>

			{/* Renderizador de Markdown */}
			<div className="text-ctd-cinza leading-relaxed">
				<MarkDown content={docs.content} docId={docs.id} />
			</div>
		</article>
	)
}
