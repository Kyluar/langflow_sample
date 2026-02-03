'use server'

import { revalidatePath } from "next/cache";
import api from "../config/axios";
import type { CreateDocumentSchema, DocumentSchema } from "@repo/schemas";
import { createDocumentSchema } from "@repo/schemas";

export async function createDocAction(data: CreateDocumentSchema) {
    try {
        console.log("Dados recebidos:", data);
        const validatedData = createDocumentSchema.parse(data);
        console.log("Dados validados:", validatedData);

        const res = await api.post<DocumentSchema>('/document', validatedData);
        console.log("Documento criado com sucesso:", res.data);

        revalidatePath('/', 'layout');
        return { success: true, id: res.data.id };
    } catch (error) {
        console.error("Erro na criação:", error);
        return {
            success: false,
            error: "Falha ao registrar documento no banco."
        };
    }
}