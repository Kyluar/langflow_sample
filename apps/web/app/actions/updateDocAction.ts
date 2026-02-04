// actions/updateDocAction.ts
'use server'

import { type DocumentSchema, updateDocumentSchema } from "@repo/schemas";
import { revalidatePath } from "next/cache";
import api from "../config/axios";
export async function updateDocAction(id: string, title: string, content: string) {
    try {
        const validatedData = updateDocumentSchema.parse({ content });
        await api.patch<DocumentSchema>(`/document/${id}`, validatedData);
        revalidatePath(`/docs/${encodeURIComponent(title)}`);
        revalidatePath('/', 'layout');

        return { success: true, message: "Documento atualizado com sucesso!" };
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Erro ao atualizar documento.";
        return { success: false, message };
    }
}