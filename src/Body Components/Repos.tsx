import type {Repos} from "../Shared/types.tsx";

interface Props {
    reposUser: Repos[] | null,
}

export default function Reposs({reposUser}: Props) {
    return (
        <div>
            <h1 className='mx-4 mt-3 mb-3 font-bold text-2xl'>Repositories:</h1>
            {reposUser !== null && Array.isArray(reposUser) && reposUser.map(repo => (
                <a href={repo.html_url} target='_blank' rel='noreferrer' className='no-underline'>
                    <div key={repo.name} className='bg-slate-50 dark:bg-ink-800 border border-slate-200 dark:border-ink-700 rounded-2xl p-3 flex flex-col gap-1 hover:bg-white dark:hover:bg-ink-700 hover:border-accent-500/50 hover:-translate-y-0.5 transition-all cursor-pointer mb-1 items-center mx-2 mb-2 min-h-max'>
                        <div className='font-bold text-sm truncate'>{repo.name}</div>
                        <div className='text-slate-600 dark:text-white/50 text-xs line-clamp-2'>{repo.description}</div>
                        <div className='flex gap-3 text-xs text-slate-500 dark:text-white/40 mt-1'>
                            <span>{repo.language}</span>
                            <span>⭐ {repo.stargazers_count}</span>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    )
}