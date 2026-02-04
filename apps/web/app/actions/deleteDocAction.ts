'use server'

import { revalidatePath } from "next/cache";
import api from "../config/axios";

export async function deleteDocAction(id: string) {
    try {
        await api.delete(`/document/${id}`);

        revalidatePath('/', 'layout');

        return { success: true, message: "Documento excluído com sucesso!" };
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Erro ao excluir documento.";
        return { success: false, message };
    }
}