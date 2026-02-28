import React, { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    isLoading?: boolean
}

export function Button({
    className,
    variant = 'primary',
    size = 'md',
    isLoading,
    children,
    disabled,
    ...props
}: ButtonProps) {

    const baseStyles = 'inline-flex items-center justify-center font-sans font-medium uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
        primary: 'bg-text-primary text-bg-main hover:bg-gold hover:text-white',
        secondary: 'bg-gold text-white hover:bg-gold-hover',
        outline: 'border border-text-primary text-text-primary hover:bg-text-primary hover:text-bg-main',
        ghost: 'text-text-primary hover:text-gold border-b border-transparent hover:border-gold pb-1 rounded-none'
    }

    const sizes = {
        sm: 'px-4 py-2 text-xs',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-sm',
    }

    const classes = twMerge(
        baseStyles,
        variant !== 'ghost' && 'rounded-sm', // Slight rounding for a modern yet classic feel
        variants[variant],
        variant !== 'ghost' && sizes[size],
        className
    )

    return (
        <button
            className={classes}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : null}
            {children}
        </button>
    )
}
