import type { DocumentSchema } from "@repo/schemas";
import Link from 'next/link';
import api from '../config/axios';
import { DocumentListSkeleton } from "./DocumentListSkeleton";
import { RESOURCES } from "@repo/constants";

export default async function DocumentList() {
    let documents = [];

    try {
        const response = await api.get<DocumentSchema[]>(RESOURCES.DOCUMENTS);
        documents = response.data || [];
    } catch (error) {
        console.error("Falha ao conectar na API:", error);
        return <DocumentListSkeleton />
    }

    if (documents.length === 0) {
        return <p>Nenhum documento encontrado.</p>;
    }
    return (
        <nav className="w-full space-y-2.5">
            {documents.map((item) => (
                <Link
                    key={item.id}
                    href={`/docs/${encodeURIComponent(item.title)}`}
                    className="group relative flex items-center justify-center py-3 px-4 rounded-lg overflow-hidden transition-all duration-300"
                >
                    <span className="absolute inset-0 bg-white/15 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center"></span>
                    <span className="relative z-10 text-lg font-medium group-hover:scale-105 transition-transform duration-300">
                        {item.title}
                    </span>
                </Link>
            ))}
        </nav>
    )
}