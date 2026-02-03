import { MarkDown } from '../../_components/MarkDown'
import api from '../../config/axios'
import type { DocumentSchema } from '@repo/schemas'

export default async function DocPage({
    params
}: {
    params: Promise<{ title: string }>
}) {
    // 1. Aguarda o parâmetro da URL
    const resolvedParams = await params;
    
    // 2. Decodifica o título (transfere "Guia%20do%20Dev" para "Guia do Dev")
    const decodedTitle = decodeURIComponent(resolvedParams.title);

    let docs: DocumentSchema | null = null;

    try {
        // 3. Chamada à API - Verifique se a URL da API está correta
        // Se o título tem espaços, o axios/browser precisa enviar corretamente
        const response = await api.get<DocumentSchema>(`/document/title/${decodedTitle}`);
        docs = response.data;
    } catch (error) {
        console.error("Erro na busca por título:", error);
    }

    if (!docs) {
        return (
            <div className="p-10">
                <h2 className="text-2xl font-bold text-gray-400">Documento não encontrado.</h2>
                <p>Título buscado: {decodedTitle}</p>
            </div>
        );
    }

	return (
		<article className="prose prose-slate max-w-none">
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
