import { useId } from 'react';

export function DocumentListSkeleton() {
    const baseId = useId();

    // Criamos uma lista de objetos com IDs únicos e fixos baseados no useId
    // Isso remove qualquer dependência do 'index' do map
    const skeletonItems = Array.from({ length: 11 }, (_, index) => ({
        id: `${baseId}-item-${index}`,
        width: index % 2 === 0 ? '60%' : '75%'
    }));

    return (
        <div className="w-full space-y-2.5">
            {skeletonItems.map((item) => (
                <div
                    key={item.id} // Usando a propriedade 'id' do objeto, não o index
                    className="relative overflow-hidden flex items-center justify-center py-4 px-4 rounded-lg bg-white/5 border border-white/10"
                >
                    {/* A LUZ (Shimmer) */}
                    <div
                        className="absolute inset-0 z-0 animate-shimmer-slide"
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                            width: '100%',
                            filter: 'blur(5px)',
                        }}
                    />

                    {/* Barra de texto fake */}
                    <div
                        className="h-2.5 bg-white/20 rounded-full z-10 relative"
                        style={{ width: item.width }}
                    ></div>
                </div>
            ))}
        </div>
    );
}