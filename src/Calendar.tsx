import type {ContributionWeek} from "./types.tsx";

interface Props {
    totalCommits: number,
    weeks: ContributionWeek[],
}

export default function Calendar({totalCommits, weeks}: Props) {
    return (
        <div className='mt-15'>
            <div className='flex justify-between items-center px-2 mx-20'>
                <span className='text-white/50 text-sm'>Contribution activity</span>
                <span className='text-white/70 font-bold'>{totalCommits} contributions this year</span>
            </div>
            <div className='flex gap-1 justify-center mt-5'>
                {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className='flex flex-col gap-1'>
                        {week.contributionDays.map(day => (
                            <div
                                key={day.date}
                                className={`w-3 h-3 rounded-sm ${day.contributionCount === 0 ? 'bg-gray-800' : day.contributionCount < 3 ? 'bg-purple-900' : day.contributionCount < 6 ? 'bg-purple-700' : 'bg-purple-500'}`}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}