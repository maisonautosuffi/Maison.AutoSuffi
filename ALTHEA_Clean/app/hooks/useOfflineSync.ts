'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'

interface OfflineAction {
    id: string
    type: 'INSPECTION' | 'ISSUE' | 'DELIVERY'
    payload: any
    timestamp: number
    status: 'PENDING' | 'SYNCING' | 'ERROR'
}

export function useOfflineSync() {
    const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true)
    const [queue, setQueue] = useState<OfflineAction[]>([])
    const [isSyncing, setIsSyncing] = useState(false)

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    // We instantiate the client lazily for the browser
    const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

    // Load queue on mount
    useEffect(() => {
        const storedQueue = localStorage.getItem('althea_offline_queue')
        if (storedQueue) {
            setQueue(JSON.parse(storedQueue))
        }

        const handleOnline = () => setIsOnline(true)
        const handleOffline = () => setIsOnline(false)

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [])

    // Trigger sync when coming back online
    useEffect(() => {
        if (isOnline && queue.length > 0 && !isSyncing) {
            syncQueue()
        }
    }, [isOnline]) // eslint-disable-line react-hooks/exhaustive-deps

    const enqueueAction = (type: OfflineAction['type'], payload: any) => {
        const newAction: OfflineAction = {
            id: Math.random().toString(36).substring(7),
            type,
            payload,
            timestamp: Date.now(),
            status: 'PENDING'
        }

        const updatedQueue = [...queue, newAction]
        setQueue(updatedQueue)
        localStorage.setItem('althea_offline_queue', JSON.stringify(updatedQueue))

        if (isOnline) {
            syncQueue()
        }
    }

    const syncQueue = async () => {
        setIsSyncing(true)
        const currentQueue = [...queue]
        const remainingQueue: OfflineAction[] = []

        for (const action of currentQueue) {
            if (action.status === 'ERROR') {
                remainingQueue.push(action)
                continue;
            }

            try {
                // Simulate Supabase generic upsert based on payload type
                if (action.type === 'INSPECTION') {
                    const { error } = await supabase.from('inspection_report').insert(action.payload)
                    if (error) throw error
                } else if (action.type === 'ISSUE') {
                    const { error } = await supabase.from('issue').insert(action.payload)
                    if (error) throw error
                } else if (action.type === 'DELIVERY') {
                    const { error } = await supabase.from('delivery').insert(action.payload)
                    if (error) throw error
                }

                // If it passes, it gets dropped from queue (not pushed to remainingQueue)
            } catch (error) {
                console.error('Failed to sync action', action, error)
                remainingQueue.push({ ...action, status: 'ERROR' })
            }
        }

        setQueue(remainingQueue)
        localStorage.setItem('althea_offline_queue', JSON.stringify(remainingQueue))
        setIsSyncing(false)
    }

    const clearErrorQueue = () => {
        const pendings = queue.filter(q => q.status !== 'ERROR')
        setQueue(pendings)
        localStorage.setItem('althea_offline_queue', JSON.stringify(pendings))
    }

    return {
        isOnline,
        isSyncing,
        queueCount: queue.length,
        errorsCount: queue.filter(q => q.status === 'ERROR').length,
        enqueueAction,
        syncQueue,
        clearErrorQueue
    }
}
