'use client'

import { Toaster } from 'react-hot-toast'

export const ToasterContext = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        className: 'border border-ctd-azul-01/10 shadow-lg font-sans text-sm',
        duration: 4000,
        style: {
          background: 'var(--color-ctd-fundo)',
          color: 'var(--color-ctd-cinza)',
          borderRadius: '10px',
          padding: '16px',
        },
        // Estilos específicos
        success: {
          iconTheme: {
            primary: 'var(--color-ctd-azul-01)',
            secondary: '#FFFFFF',
          },
          className: 'border-l-4 border-l-ctd-azul-02', 
        },
        error: {
          iconTheme: {
            primary: '#e11d48',
            secondary: '#FFFFFF',
          },
          className: 'border-l-4 border-l-red-500',
        },
      }}
    />
  )
}