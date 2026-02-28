'use client'

import { useActionState } from 'react'
import { loginAction } from '../actions'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function LoginForm() {
    const [state, formAction, isPending] = useActionState(loginAction, null)

    return (
        <form className="mt-10 space-y-8 reveal-text reveal-delay-1" action={formAction}>
            <input type="hidden" name="remember" value="true" />

            <div className="space-y-6">
                <Input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    label="Adresse Email"
                    placeholder="votre@email.com"
                />
                <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    label="Mot de passe"
                    placeholder="••••••••"
                />
            </div>

            {state?.error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-sm font-sans">
                    {state.error}
                </div>
            )}

            <div className="flex items-center justify-end text-sm font-sans mt-2">
                <a href="#" className="text-text-accent hover:text-gold transition-colors">
                    Mot de passe oublié ?
                </a>
            </div>

            <div className="pt-4 reveal-text reveal-delay-2">
                <Button type="submit" className="w-full" size="lg" isLoading={isPending}>
                    Se connecter
                </Button>
            </div>
        </form>
    )
}
