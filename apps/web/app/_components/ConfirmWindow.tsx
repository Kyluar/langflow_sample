'use client'
import toast from 'react-hot-toast'

type ConfirmWindowProps = {
  message: string
  onConfirm: () => void
}

export default function ConfirmWindow({
  message,
  onConfirm,
}: ConfirmWindowProps) {
  return toast.custom((t) => (
    <div className={`${t.visible ? 'animate-in fade-in' : 'animate-out fade-out'} fixed inset-0 flex items-center justify-center pointer-events-none`}>

      <button
        type="button"
        className="absolute inset-0 bg-ctd-azul-01/40 backdrop-blur-sm pointer-events-auto cursor-default"
        onClick={() => toast.remove(t.id)}
        title="Fechar"
      />

      <div className="relative bg-white w-[calc(100%-2rem)] max-w-sm rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-white/20 animate-in zoom-in-95 duration-200 my-auto">

        <div className="p-8 text-center">

          <h3 className="text-ctd-azul-01 font-bold text-lg mb-2">Atenção</h3>
          <p className="text-ctd-cinza font-medium leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex p-4 gap-3 bg-gray-50/50 border-t border-gray-100">
          <button
            type="button"
            onClick={() => toast.remove(t.id)}
            className="flex-1 px-4 py-3 text-xs font-bold text-ctd-cinza bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition-all active:scale-95 shadow-sm"
          >
            CANCELAR
          </button>

          <button
            type="button"
            onClick={() => {
              toast.remove(t.id);
              onConfirm();
            }}
            className="flex-1 px-4 py-3 text-xs font-bold text-white bg-ctd-azul-02 rounded-xl shadow-md shadow-ctd-azul-01/20 hover:bg-ctd-azul-01 transition-all active:scale-95"
          >
            CONFIRMAR
          </button>
        </div>
      </div>
    </div>
  ), { duration: Infinity })
}