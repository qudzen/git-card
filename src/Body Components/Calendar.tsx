import type {ContributionWeek} from "../Shared/types.tsx";
import { FaFire } from 'react-icons/fa';

interface Props {
    totalCommits: number,
    weeks: ContributionWeek[],
    currentStreak: number,
    isActive: boolean,
}

export default function Calendar({totalCommits, weeks, currentStreak, isActive}: Props) {
    return (
        <div className='mt-8 md:mt-15'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-2 px-2 mx-2 md:mx-4'>
                <span className='text-gray-700 dark:text-white/50 text-sm flex flex-row gap-2'>
                    Contribution activity:
                    {isActive ?
                        <span className="text-purple-600 font-bold flex flex-row gap-1"><FaFire size={20}/>{currentStreak}</span>
                        :
                        <span className="text-gray-500"><FaFire size={20}/></span>}
                </span>
                        <span className='text-gray-700 dark:text-white/70 font-bold text-sm md:text-base'>{totalCommits} contributions this year</span>
            </div>
            <div className='overflow-x-auto pb-2 mt-3'>
                <div className='inline-flex gap-1 min-w-max px-2 md:ml-15'>
                    {weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className='flex flex-col gap-1'>
                            {week.contributionDays.map(day => (
                                <div
                                    key={day.date}
                                    className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-sm ${day.contributionCount === 0 ? 'bg-gray-200 dark:bg-gray-700' : day.contributionCount < 3 ? 'bg-purple-300 dark:bg-purple-900' : day.contributionCount < 6 ? 'bg-purple-500 dark:bg-purple-700' : 'bg-purple-700 dark:bg-purple-500'}`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}