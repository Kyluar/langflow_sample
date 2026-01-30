'use server'
import { revalidatePath } from 'next/cache'
import api from '../config/axios'

export async function updateDocAction(id: string, newContent: string) {
    try {
        await api.patch(`/document/${id}`, {
            content: newContent,
            updatedAt: new Date().toISOString()
        });

        // Limpa o cache do Next.js para refletir a mudança instantaneamente
        revalidatePath(`/docs/${id}`);
        revalidatePath('/', 'layout');

        return { success: true };
    } catch (error) {
        console.error("Erro ao atualizar documento:", error);
        return { success: false, error: "Falha ao salvar no servidor" };
    }
}