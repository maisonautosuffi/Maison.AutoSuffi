import { redirect } from 'next/navigation'

// Root page logic: just redirect to login (or let middleware handle it if the user is already authenticated to redirect to /dashboard)
export default function Home() {
    redirect('/login')
}
