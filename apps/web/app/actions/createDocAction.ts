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
        return { success: true, message:'Documento criado com sucesso!' ,title: res.data.title };
    } catch (error: any) {
        const message = error.response?.data?.message || error.message || "Falha ao criar documento.";
        return { success: false, message };
    }
}