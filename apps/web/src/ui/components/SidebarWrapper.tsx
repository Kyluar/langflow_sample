"use client"

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(true)

    const sidebarWidth = "340px"
    const closedWidth = "64px"

    return (
        <div className="relative flex h-full overflow-hidden">
            <aside
                className="transition-all duration-500 ease-in-out relative flex-shrink-0 z-40 border-r border-black/10 shadow-xl bg-ctd-azul-01"
                style={{
                    width: isOpen ? sidebarWidth : closedWidth,
                    minWidth: isOpen ? sidebarWidth : closedWidth
                }}
            >
                <div
                    className={`w-[340px] h-full transition-all duration-500 ease-in-out ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                        }`}
                >
                    {children}
                </div>

                <button
                    type={'button'}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        absolute top-6 z-50
                        flex items-center justify-center
                        w-10 h-10 rounded-lg shadow-lg
                        transition-all duration-500 ease-in-out
                        border-2
                        ${isOpen
                            ? 'right-4 bg-white text-ctd-azul-01 border-white hover:scale-110'
                            : 'left-1/2 -translate-x-1/2 bg-ctd-azul-01 text-white border-ctd-azul-01 hover:bg-ctd-azul-02'
                        }
                    `}
                >
                    {isOpen ? <ChevronLeft size={24} strokeWidth={2.5} /> : <ChevronRight size={24} strokeWidth={2.5} />}
                </button>
            </aside>

        </div>
    )
}