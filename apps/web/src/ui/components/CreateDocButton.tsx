'use client'

import type { CreateDocumentSchema } from '@repo/schemas'
import { Button } from '@repo/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { createDocAction } from '@/lib/actions/createDocAction'

export function CreateDocButton() {
	const [isOpen, setIsOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState<CreateDocumentSchema>({
		title: '',
		content: ''
	})

	const router = useRouter()

	async function handleCreate() {
		if (!formData.title.trim()) {
			toast.error('O título é obrigatório!', {
				icon: '⚠️'
			})
			return
		}

		setLoading(true)

		try {
			const actionPromise = createDocAction(formData)
			const result = await toast.promise(actionPromise, {
				loading: 'Criando documento...',
				success: (data) => {
					return data.message || 'Criado com sucesso!'
				},
				error: (err) => err.message || 'Erro ao criar documento.'
			})
			router.push(`/docs/${result.title}`)
		} catch (err: unknown) {
			console.error('Erro capturado:', err)
		} finally {
			setLoading(false)
			setIsOpen(false)
			setFormData({ title: '', content: '' })
		}
	}

	return (
		<>
			<Button
				onClick={() => setIsOpen(true)}
				className="mt-6 w-full py-2.5 px-4 border-2 border-white/30 rounded-lg hover:bg-white/10 transition-all font-bold text-sm"
			>
				+ Novo Documento
			</Button>

			{isOpen && (
				<div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
					<div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
						<div className="mb-6">
							<h2 className="text-2xl font-bold text-ctd-azul-01">
								Criar Nova Documentação
							</h2>
							<p className="text-sm text-gray-500">
								Preencha os campos abaixo para iniciar o documento.
							</p>
						</div>

						<div className="space-y-5">
							<div>
								<p className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 ml-1">
									Título da Página
								</p>
								<input
									type="text"
									placeholder="Ex: Arquitetura do Sistema"
									className="w-full rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-3 outline-none focus:border-ctd-azul-02 transition-all text-gray-800"
									value={formData.title}
									onChange={(e) =>
										setFormData((prev) => ({ ...prev, title: e.target.value }))
									}
								/>
							</div>

							<div>
								<p className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 ml-1">
									Conteúdo Inicial (Markdown)
								</p>
								<textarea
									placeholder="# Comece seu guia aqui..."
									className="w-full h-64 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-3 outline-none focus:border-ctd-azul-02 transition-all text-gray-800 font-mono text-sm resize-none"
									value={formData.content}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											content: e.target.value
										}))
									}
								/>
							</div>
						</div>

						<div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
							<button
								type="button"
								onClick={() => setIsOpen(false)}
								className="px-6 py-2.5 text-sm font-semibold text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
							>
								Cancelar
							</button>
							<button
								type="button"
								onClick={handleCreate}
								disabled={loading}
								className="bg-ctd-azul-01 px-8 py-2.5 text-sm font-semibold text-white rounded-lg hover:bg-ctd-azul-02 disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-ctd-azul-01/20 transition-all active:scale-95"
							>
								{loading && (
									<span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
								)}
								{loading ? 'Processando...' : 'Criar Agora'}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
