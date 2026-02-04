'use server'

import { revalidatePath } from "next/cache";
import api from "../config/axios";

export async function deleteDocAction(id: string) {
    try {
        await api.delete(`/document/${id}`);
        
        // Revalida o layout para remover o item da barra lateral
        revalidatePath('/', 'layout');
        
        return { success: true, message: "Documento excluído com sucesso!" };
    } catch (error: any) {
        console.error("Erro ao deletar:", error);
        const message = error.response?.data?.message || error.message || "Falha ao excluir documento.";
        return { success: false, message };
    }
}