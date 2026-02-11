'use client'

import useApiResponse from '@/lib/hooks/useApiResponse'
import { MarkDown } from '@/ui/components/MarkDown'
import type { ApiResponse, DocumentSchema } from '@repo/schemas'

type DocumentProps = {
	documentPromise: Promise<ApiResponse<DocumentSchema>>
}

export default function Document({ documentPromise }: DocumentProps) {
	const document = useApiResponse(documentPromise)

	if (document === null) {
		return (
			<div className="p-10">
				<h2 className="text-2xl font-bold text-gray-400">
					Documento não encontrado.
				</h2>
			</div>
		)
	}

	return (
		<article className="prose prose-slate max-w-none px-10 py-12">
			{/* Header da Página */}
			<div className="mb-8 border-b border-gray-100 pb-4">
				<h2 className="text-4xl font-extrabold text-ctd-azul-01 mt-2 mb-3">
					{document.title}
				</h2>
				<p className="text-xs text-gray-400">
					Última atualização:{' '}
					{new Intl.DateTimeFormat('pt-BR', {
						day: '2-digit',
						month: '2-digit',
						year: 'numeric',
						hour: '2-digit',
						minute: '2-digit'
					}).format(new Date(document.updatedAt))}
				</p>
			</div>

			{/* Renderizador de Markdown */}
			<div className="text-ctd-cinza leading-relaxed">
				<MarkDown
					content={document.content}
					title={document.title}
					docId={document.id}
				/>
			</div>
		</article>
	)
}
