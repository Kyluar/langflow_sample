// actions/updateDocAction.ts
'use server'

import { revalidatePath } from "next/cache";
import api from "../config/axios";
import { type DocumentSchema, updateDocumentSchema } from "@repo/schemas";
export async function updateDocAction(id: string, title: string, content: string) {
    try {
        const validatedData = updateDocumentSchema.parse({ content });
        await api.patch<DocumentSchema>(`/document/${id}`, validatedData);
        revalidatePath(`/docs/${encodeURIComponent(title)}`);
        revalidatePath('/', 'layout');

        return { success: true, message: "Documento atualizado com sucesso!" };
    } catch (error: any) {
        console.error("Erro na atualização:", error);
        return {
            success: false,
            message: error || "Falha ao atualizar documento."
        };
    }
}