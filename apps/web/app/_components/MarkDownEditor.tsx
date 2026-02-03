'use client'
import { useState } from 'react'
import { updateDocAction } from '../actions/updateDocAction'
import toast from 'react-hot-toast'

export function MarkDownEditor({
	initialContent,
	title,
	docId,
	onSaveSuccess
}: {
	initialContent: string
	title: string
	docId: string
	onSaveSuccess: () => void
}) {
	const [content, setContent] = useState(initialContent)
	const [loading, setLoading] = useState(false)

	async function salvar() {
		const result = updateDocAction(docId, title, content)
		try {
			setLoading(true)
			await toast.promise(result, {
                loading: 'Salvando alterações...',
                success: () => {
                    return <b>Alterações salvas com sucesso!</b>
                },
                error: (err) => {
                    console.error(err)
                    return <b>Erro ao salvar documento.</b>
                }
            })
		} catch (error: unknown) {
			console.error(error)
		} finally {
			setLoading(false)
			onSaveSuccess()
		}
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
				<p className="text-sm text-yellow-700 font-bold">Modo Edição Ativo</p>
			</div>
			<textarea
				className="w-full min-h-[500px] p-6 font-mono text-sm border-2 border-ctd-azul-02/20 rounded-xl focus:border-ctd-azul-02 outline-none shadow-inner bg-gray-50"
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>

			{/* Botão de salver conteudo dentro da textarea na API */}
			<button
				type="button"
				onClick={salvar}
				disabled={loading}
				className="
				inline-flex items-center gap-2
				self-start
				rounded-full px-7 py-2.5
				bg-ctd-azul-02
				text-sm font-semibold text-white
				shadow-md shadow-black/10
				transition-all duration-200
				hover:bg-ctd-azul-01
				active:scale-95
				disabled:cursor-not-allowed disabled:opacity-60
			"
			>
				{loading && (
					<span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
				)}
				{loading ? 'Salvando...' : 'Salvar Alterações'}
			</button>
		</div>
	)
}
