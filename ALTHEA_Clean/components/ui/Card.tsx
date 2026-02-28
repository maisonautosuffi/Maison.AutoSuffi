import React from 'react'
import { twMerge } from 'tailwind-merge'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export function Card({ className, children, ...props }: CardProps) {
    return (
        <div
            className={twMerge(
                "bg-bg-card p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-text-accent/10 rounded-xl",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}
