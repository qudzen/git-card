import type {ContributionWeek} from "../Shared/types.tsx";
import { FaFire } from 'react-icons/fa';

interface Props {
    weeks: ContributionWeek[],
    currentStreak: number,
    isActive: boolean,
}

export default function Calendar({weeks, currentStreak, isActive}: Props) {
    return (
        <div className='bg-white dark:bg-ink-900 border border-slate-200 dark:border-ink-800 rounded-2xl shadow-lg dark:shadow-none p-6'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4'>
                <h2 className='font-bold text-lg text-slate-900 dark:text-white'>Contribution activity</h2>
                {isActive ? (
                    <span className='flex items-center gap-1.5 text-accent-500 font-bold text-sm'>
                        <FaFire size={18}/> {currentStreak} day streak
                    </span>
                ) : (
                    <span className='flex items-center gap-1.5 text-slate-400 dark:text-white/30 text-sm'>
                        <FaFire size={18}/> no active streak
                    </span>
                )}
            </div>

            <div className='overflow-x-auto pb-2'>
                <div className='inline-flex gap-1 min-w-max'>
                    {weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className='flex flex-col gap-1'>
                            {week.contributionDays.map(day => (
                                <div
                                    key={day.date}
                                    className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-sm ${day.contributionCount === 0 ? 'bg-slate-200 dark:bg-ink-700' : day.contributionCount < 3 ? 'bg-accent-300 dark:bg-accent-800' : day.contributionCount < 6 ? 'bg-accent-500 dark:bg-accent-600' : 'bg-accent-700 dark:bg-accent-400'}`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex items-center justify-end gap-1.5 mt-3 text-xs text-slate-500 dark:text-white/40'>
                <span>Less</span>
                <span className='w-3 h-3 rounded-sm bg-slate-200 dark:bg-ink-700' />
                <span className='w-3 h-3 rounded-sm bg-accent-300 dark:bg-accent-800' />
                <span className='w-3 h-3 rounded-sm bg-accent-500 dark:bg-accent-600' />
                <span className='w-3 h-3 rounded-sm bg-accent-700 dark:bg-accent-400' />
                <span>More</span>
            </div>
        </div>
    )
}
