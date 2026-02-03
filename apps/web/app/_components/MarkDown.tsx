'use client'
import ReactMarkdown from 'react-markdown'
import { MarkDownEditor } from './MarkDownEditor'
import { useState } from 'react'
import { Button } from '@repo/ui/button'

export function MarkDown({
	content,
	title,
	docId
}: {
	content: string
	title: string
	docId: string
}) {
	const [isEditing, setIsEditing] = useState(false)
	return (
		<>
			<Button
				onClick={() => setIsEditing(!isEditing)}
				className={`fixed bottom-8 right-8 z-50 inline-flex items-center gap-2 rounded-full px-7 py-3 
				text-sm font-semibold  text-white shadow-lg transition-all duration-200 active:scale-95
				${isEditing ? 'bg-red-500 hover:bg-red-600' : 'bg-ctd-azul-02 hover:bg-ctd-azul-01'} `}
			>
				{isEditing ? 'Cancelar Edição' : 'Editar Conteúdo'}
			</Button>

			<article className="prose prose-slate max-w-none">
				{/* Renderizador de Markdown */}
				<div className="text-ctd-cinza leading-relaxed">
					{isEditing ? (
						<MarkDownEditor
							initialContent={content}
							docId={docId}
							title={title}
							onSaveSuccess={() => setIsEditing(false)}
						/>
					) : (
						<ReactMarkdown>{content}</ReactMarkdown>
					)}
				</div>
			</article>
		</>
	)
}
