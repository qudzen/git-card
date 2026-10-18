import type {LanguageStat} from "../Shared/types.tsx";

interface Props {
    languages: LanguageStat[],
    compact?: boolean,
}

export default function Languages({languages, compact = false}: Props) {
    if (!Array.isArray(languages) || languages.length === 0) return null

    return (
        <div className={compact ? 'w-full' : ''}>
            <h3 className={compact
                ? 'text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-white/40 mb-2.5'
                : 'mx-4 mt-3 mb-3 font-bold text-2xl'}>
                Languages
            </h3>
            <div className={`${compact ? '' : 'mx-4 mb-2 '}flex flex-col gap-2.5`}>
                {languages.map(lang => (
                    <div key={lang.name}>
                        <div className={`flex justify-between items-center ${compact ? 'text-xs' : 'text-xs'} text-slate-600 dark:text-white/50 mb-1`}>
                            <span className='flex items-center gap-1.5 font-semibold'>
                                <span className='w-2.5 h-2.5 rounded-full shrink-0' style={{backgroundColor: lang.color}} />
                                {lang.name}
                            </span>
                            <span className='font-semibold'>{lang.percent}%</span>
                        </div>
                        <div className='h-2 rounded-full bg-slate-200 dark:bg-ink-700 overflow-hidden'>
                            <div className='h-full rounded-full' style={{width: `${lang.percent}%`, backgroundColor: lang.color}} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
