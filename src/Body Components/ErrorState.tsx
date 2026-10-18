import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { ApiError } from '../Shared/types.tsx'
import { FiUserX, FiAlertCircle, FiClock, FiWifiOff, FiServer, FiRefreshCw } from 'react-icons/fi'

interface Props {
    error: ApiError
    onRetry?: () => void
    compact?: boolean
}

function getMeta(error: ApiError): { icon: ReactNode; title: string } {
    switch (error.kind) {
        case 'not-found':
            return { icon: <FiUserX />, title: 'User not found' }
        case 'rate-limit':
            return { icon: <FiAlertCircle />, title: 'GitHub API rate limit exceeded' }
        case 'timeout':
            return { icon: <FiClock />, title: 'Request timed out' }
        case 'network':
            return { icon: <FiWifiOff />, title: 'Network error' }
        case 'server':
            return { icon: <FiServer />, title: 'Server error' }
        default:
            return { icon: <FiAlertCircle />, title: error.message || 'Something went wrong' }
    }
}

export default function ErrorState({ error, onRetry, compact = false }: Props) {
    const meta = getMeta(error)
    const [now, setNow] = useState<number>(() => Date.now())

    useEffect(() => {
        if (error.kind !== 'rate-limit' || !error.resetAt) return
        const id = setInterval(() => setNow(Date.now()), 1000)
        return () => clearInterval(id)
    }, [error])

    let countdown = ''
    if (error.kind === 'rate-limit' && error.resetAt) {
        const secs = Math.max(0, Math.floor(error.resetAt - now / 1000))
        countdown = `${Math.floor(secs / 60)}m ${secs % 60}s`
    }

    if (compact) {
        return (
            <div className='flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-2xl px-4 py-3 mt-2 mb-2'>
                <span className='text-xl shrink-0'>{meta.icon}</span>
                <span className='font-semibold text-sm flex-1'>
                    {meta.title}
                    {countdown ? ` · try again in ${countdown}` : ''}
                </span>
                {onRetry && (
                    <button onClick={onRetry} className='shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 transition-colors text-sm font-semibold'>
                        <FiRefreshCw /> Retry
                    </button>
                )}
            </div>
        )
    }

    return (
        <div className='flex flex-col items-center justify-center flex-grow text-slate-400 dark:text-white/30 mt-2 mb-2 mx-3'>
            <span className='text-8xl'>{meta.icon}</span>
            <span className='text-2xl font-bold text-slate-500 dark:text-white/50'>{meta.title}</span>
            {countdown && <span className='text-lg font-semibold mt-2'>Try again in {countdown}</span>}
            {onRetry && (
                <button onClick={onRetry} className='mt-4 flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-300 hover:bg-accent-500/20 transition-colors font-semibold'>
                    <FiRefreshCw /> Retry
                </button>
            )}
        </div>
    )
}
