'use client'
import { API_ROUTES, RESOURCES } from '@repo/constants'
import type { DocumentSchema, UpdateDocumentSchema } from '@repo/schemas'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { apiAction } from '@/lib/actions'
import ConfirmWindow from './ConfirmWindow'

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
	const [loadingUpdate, setLoadingUpdate] = useState(false)
	const [loadingDelete, setLoadingDelete] = useState(false)
	const router = useRouter()

	async function saveDoc() {
		setLoadingUpdate(true)
		const actionPromise = apiAction<DocumentSchema, UpdateDocumentSchema>({
			method: 'patch',
			url: API_ROUTES.DOCUMENTS.BY_ID(docId),
			data: { title, content },
			successMessage: 'Documento alterado com sucesso!',
			tags: [RESOURCES.DOCUMENTS]
		})

		const { data, message } = await toast.promise(actionPromise, {
			loading: 'Salvando alterações...'
		})

		if (data) {
			toast.success(message)
			onSaveSuccess()
		} else {
			toast.error(message)
		}

		setLoadingUpdate(false)
	}

	async function deleteDoc() {
		setLoadingDelete(true)
		const actionPromise = apiAction<DocumentSchema>({
			method: 'delete',
			url: API_ROUTES.DOCUMENTS.BY_ID(docId),
			successMessage: 'Documento excluído com sucesso!',
			tags: [RESOURCES.DOCUMENTS]
		})

		const { data, message } = await toast.promise(actionPromise, {
			loading: 'Excluindo documento...'
		})

		if (data) {
			toast.success(message)
			router.push('/')
		} else {
			toast.error(message)
		}

		setLoadingDelete(false)
	}

	function confirmDelete() {
		ConfirmWindow({
			message: `Tem certeza que deseja excluir "${title}"? Esta ação é irreversível.`,
			onConfirm: deleteDoc
		})
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
				<p className="text-sm text-yellow-700 font-bold">Modo Edição Ativo</p>
			</div>

			<textarea
				className="w-full min-h-[500px] resize-none p-6 font-mono text-sm border-2 border-ctd-azul-02/20 rounded-xl focus:border-ctd-azul-02 outline-none shadow-inner bg-gray-50"
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>
			<div className="flex flex-row gap-3">
				<button
					type="button"
					onClick={saveDoc}
					disabled={loadingUpdate}
					className="
                        inline-flex items-center justify-center gap-2
                        rounded-full px-7 py-2.5
                        bg-ctd-azul-02
                        text-sm font-semibold text-white
                        shadow-md shadow-black/10
                        transition-all duration-200
                        hover:bg-ctd-azul-01
                        active:scale-95
                        disabled:cursor-not-allowed disabled:opacity-60
                        min-w-[180px]
                    "
				>
					{loadingUpdate && (
						<span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
					)}
					{loadingUpdate ? 'Salvando...' : 'Salvar Alterações'}
				</button>

				<button
					type="button"
					onClick={confirmDelete}
					disabled={loadingDelete}
					className="
                        inline-flex items-center justify-center gap-2
                        rounded-full px-7 py-2.5
                        bg-red-600
                        text-sm font-semibold text-white
                        shadow-md shadow-black/10
                        transition-all duration-200
                        hover:bg-red-700
                        active:scale-95
                        disabled:cursor-not-allowed disabled:opacity-60
                        min-w-[180px]
                    "
				>
					{loadingDelete && (
						<span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
					)}
					{loadingDelete ? 'Excluindo...' : 'Excluir Documento'}
				</button>
			</div>
		</div>
	)
}
