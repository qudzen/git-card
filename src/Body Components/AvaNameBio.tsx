import type {GithubUser, LanguageStat} from "../Shared/types.tsx";
import {useState} from "react";
import { FiUsers, FiUserPlus, FiFolder } from 'react-icons/fi'
import Languages from "./Languages.tsx";

interface Props {
    results: GithubUser,
    languages: LanguageStat[],
}

function formatCount(n: number): string {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
    return String(n)
}

export default function AvaNameBio({results, languages}: Props) {
    const [imgError, setImgError] = useState<boolean>(false)

    const stats = [
        { icon: <FiUsers />, label: 'followers', value: results.followers },
        { icon: <FiUserPlus />, label: 'following', value: results.following },
        { icon: <FiFolder />, label: 'repos', value: results.public_repos },
    ]

    return (
        <div className='bg-white dark:bg-ink-900 border border-slate-200 dark:border-ink-800 rounded-2xl shadow-lg dark:shadow-none p-6 flex flex-col items-center gap-5'>
            <div className='flex-shrink-0'>
                {imgError ? (
                    <div className='rounded-full h-28 w-28 md:h-32 md:w-32 bg-gradient-to-br from-accent-600 to-indigo-500 flex items-center justify-center text-4xl font-extrabold text-white ring-4 ring-accent-500/30'>
                        {results.login[0].toUpperCase()}
                    </div>
                ) : (
                    <div className='rounded-full p-1 bg-gradient-to-br from-accent-500 via-fuchsia-400 to-indigo-400'>
                        <img
                            src={results.avatar_url}
                            onError={() => setImgError(true)}
                            className='block rounded-full object-cover h-28 w-28 md:h-32 md:w-32'
                        />
                    </div>
                )}
            </div>

            <div className='text-center'>
                {results.name !== null && (
                    <div className='font-bold text-2xl text-slate-900 dark:text-white truncate'>
                        {results.name}
                    </div>
                )}
                <a href={results.html_url} target='_blank' rel='noreferrer'
                   className='text-slate-500 dark:text-white/50 hover:text-accent-500 dark:hover:text-accent-300 transition-colors'>
                    @{results.login}
                </a>
            </div>

            {results.bio !== null && (
                <p className='text-sm text-slate-600 dark:text-white/60 text-center line-clamp-4'>{results.bio}</p>
            )}

            <div className='grid grid-cols-3 gap-2 w-full'>
                {stats.map(stat => (
                    <div key={stat.label}
                         className='flex flex-col items-center gap-1 rounded-xl bg-slate-50 dark:bg-ink-800 border border-slate-200 dark:border-ink-700 py-2.5'>
                        <span className='text-accent-500'>{stat.icon}</span>
                        <span className='font-bold text-base text-slate-900 dark:text-white leading-none'>{formatCount(stat.value)}</span>
                        <span className='text-[11px] text-slate-500 dark:text-white/40'>{stat.label}</span>
                    </div>
                ))}
            </div>

            <Languages languages={languages} compact />
        </div>
    )
}
