import { RESOURCES } from '@repo/constants'
import type { DocumentSchema } from '@repo/schemas'
import api from '../../../lib/config/axios'
import { MarkDown } from '../../../ui/components/MarkDown'

export default async function DocPage({
	params
}: {
	params: Promise<{ title: string }>
}) {
	const resolvedParams = await params

	let docs: DocumentSchema | null = null

	try {
		const response = await api.get<DocumentSchema>(
			`/${RESOURCES.DOCUMENTS}/title/${decodeURIComponent(resolvedParams.title)}`
		)
		docs = response.data
	} catch (error: unknown) {
		if (error) {
			const err = error as {
				response?: { data?: { message?: string } }
				message?: string
			}
			const message =
				err.response?.data?.message ||
				err.message ||
				'Falha ao criar documento.'

			console.error('Erro ao buscar documento:', message)
		}
	}

	if (!docs) {
		return (
			<div className="p-10">
				<h2 className="text-2xl font-bold text-gray-400">
					Documento não encontrado.
				</h2>
				<p>Título buscado: {decodeURIComponent(resolvedParams.title)}</p>
			</div>
		)
	}

	return (
		<article className="prose prose-slate max-w-none px-10 py-12">
			{/* Header da Página */}
			<div className="mb-8 border-b border-gray-100 pb-4">
				<h2 className="text-4xl font-extrabold text-ctd-azul-01 mt-2 mb-3">
					{docs.title}
				</h2>
				<p className="text-xs text-gray-400">
					Última atualização:{' '}
					{new Intl.DateTimeFormat('pt-BR', {
						day: '2-digit',
						month: '2-digit',
						year: 'numeric',
						hour: '2-digit',
						minute: '2-digit'
					}).format(new Date(docs.updatedAt))}
				</p>
			</div>

			{/* Renderizador de Markdown */}
			<div className="text-ctd-cinza leading-relaxed">
				<MarkDown content={docs.content} title={docs.title} docId={docs.id} />
			</div>
		</article>
	)
}
