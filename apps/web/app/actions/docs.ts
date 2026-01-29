'use server'
import { revalidatePath } from 'next/cache'
import { mockDocs } from '../service/mockData'

export async function updateDocAction(id: string, newContent: string) {
	const doc = mockDocs.find((d) => d.id === id)
	if (doc) {
		doc.content = newContent
		doc.updatedAt = new Date().toISOString()
	}
	revalidatePath(`/docs/${id}`)
	return { success: true }
}
