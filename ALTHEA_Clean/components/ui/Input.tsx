import React, { forwardRef, InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-sans text-text-secondary mb-2">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={twMerge(
                        "w-full bg-bg-card border border-text-accent/30 rounded-lg py-3 px-4 font-sans text-text-primary placeholder:text-text-accent/50 focus:outline-none focus:border-brand-confidence focus:ring-1 focus:ring-brand-confidence transition-all shadow-sm",
                        error && "border-red-500 focus:border-red-500 focus:ring-red-500",
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-xs text-red-500 font-sans">{error}</p>
                )}
            </div>
        )
    }
)

Input.displayName = 'Input'
