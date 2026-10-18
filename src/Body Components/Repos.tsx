import type {Repos} from "../Shared/types.tsx";
import { FiStar } from 'react-icons/fi'

interface Props {
    reposUser: Repos[] | null,
}

export default function Reposs({reposUser}: Props) {
    return (
        <div className='bg-white dark:bg-ink-900 border border-slate-200 dark:border-ink-800 rounded-2xl shadow-lg dark:shadow-none p-6'>
            <h2 className='font-bold text-lg text-slate-900 dark:text-white mb-4'>Repositories</h2>
            {reposUser !== null && Array.isArray(reposUser) && (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    {reposUser.map(repo => (
                        <a key={repo.name} href={repo.html_url} target='_blank' rel='noreferrer' className='no-underline'>
                            <div className='h-full bg-slate-50 dark:bg-ink-800 border border-slate-200 dark:border-ink-700 rounded-xl p-4 flex flex-col gap-2 hover:bg-white dark:hover:bg-ink-700 hover:border-accent-500/50 hover:-translate-y-0.5 transition-all cursor-pointer'>
                                <div className='font-semibold text-sm text-slate-900 dark:text-white truncate'>{repo.name}</div>
                                {repo.description && (
                                    <div className='text-slate-600 dark:text-white/50 text-xs line-clamp-2'>{repo.description}</div>
                                )}
                                <div className='flex items-center gap-3 text-xs text-slate-500 dark:text-white/40 mt-auto pt-1'>
                                    {repo.language && (
                                        <span className='flex items-center gap-1.5'>
                                            <span className='w-2 h-2 rounded-full bg-accent-400' />
                                            {repo.language}
                                        </span>
                                    )}
                                    <span className='flex items-center gap-1'><FiStar /> {repo.stargazers_count}</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    )
}
