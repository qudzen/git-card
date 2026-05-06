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
        <div className='mt-15'>
            <div className='flex justify-between items-center px-2 mx-20 flex-row'>
                <span className='text-gray-700 dark:text-white/50 text-sm flex flex-row gap-2'>
                    Contribution activity:
                    {isActive ?
                        <span className="text-purple-600 font-bold flex flex-row gap-1"><FaFire size={20}/>{currentStreak}</span>
                        :
                        <span className="text-gray-500"><FaFire size={20}/></span>}
                </span>
                <span className='text-gray-700 dark:text-white/70 font-bold'>{totalCommits} contributions this year</span>
            </div>
            <div className='flex gap-1 justify-center mt-5'>
                {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className='flex flex-col gap-1'>
                        {week.contributionDays.map(day => (
                            <div
                                key={day.date}
                                className={`w-3 h-3 rounded-sm ${day.contributionCount === 0 ? 'bg-gray-200 dark:bg-gray-700' : day.contributionCount < 3 ? 'bg-purple-300 dark:bg-purple-900' : day.contributionCount < 6 ? 'bg-purple-500 dark:bg-purple-700' : 'bg-purple-700 dark:bg-purple-500'}`}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}