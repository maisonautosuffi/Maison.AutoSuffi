import React from 'react'
import { twMerge } from 'tailwind-merge'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export function Card({ className, children, ...props }: CardProps) {
    return (
        <div
            className={twMerge(
                "bg-bg-card p-8 shadow-sm ring-1 ring-text-accent/5 rounded-2xl",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}
