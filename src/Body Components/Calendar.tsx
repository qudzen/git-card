import type {ContributionWeek} from "../Shared/types.tsx";
import { FaFire } from 'react-icons/fa';

interface Props {
    weeks: ContributionWeek[],
    currentStreak: number,
    isActive: boolean,
}

export default function Calendar({weeks, currentStreak, isActive}: Props) {
    return (
        <div className='mt-8 md:mt-15'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-y-1 px-2 md:ml-15'>
                <span className='text-slate-600 dark:text-white/50 text-sm flex flex-row gap-2 items-center'>
                    Contribution activity:
                    {isActive ?
                        <span className="text-accent-500 font-bold flex flex-row gap-1 items-center"><FaFire size={20}/>{currentStreak}</span>
                        :
                        <span className="text-slate-400 dark:text-white/30"><FaFire size={20}/></span>}
                </span>
            </div>
            <div className='overflow-x-auto pb-2 mt-3'>
                <div className='inline-flex gap-1 min-w-max px-2 md:ml-15'>
                    {weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className='flex flex-col gap-1'>
                            {week.contributionDays.map(day => (
                                <div
                                    key={day.date}
                                    className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${day.contributionCount === 0 ? 'bg-slate-200 dark:bg-ink-700' : day.contributionCount < 3 ? 'bg-accent-300 dark:bg-accent-800' : day.contributionCount < 6 ? 'bg-accent-500 dark:bg-accent-600' : 'bg-accent-700 dark:bg-accent-400'}`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}