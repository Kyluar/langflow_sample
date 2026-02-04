'use server'

import type { CreateDocumentSchema, DocumentSchema } from "@repo/schemas";
import { createDocumentSchema } from "@repo/schemas";
import { revalidatePath } from "next/cache";
import api from "../config/axios";

export async function createDocAction(data: CreateDocumentSchema) {
    try {
        const validatedData = createDocumentSchema.parse(data);

        const res = await api.post<DocumentSchema>('/document', validatedData);

        revalidatePath('/', 'layout');
        return { success: true, message: 'Documento criado com sucesso!', title: res.data.title };
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Erro ao criar documento.";
        return { success: false, message };
    }
}