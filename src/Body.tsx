import type {GithubUser, Repos, ContributionWeek} from "./types.tsx";
import {useEffect, useState} from "react";
import {fetchContributions, fetchRepos} from "./api.tsx";

interface Props {
    results: GithubUser | null,
    searchUserName: string
}
export function Body({results, searchUserName}: Props){
    const [reposUser, setRepoUsers] = useState<Repos[] | null>(null)

    const [weeks, setWeeks] = useState<ContributionWeek[]>([])

    useEffect(() => {
        async function calendar() {
            const data = await fetchContributions(searchUserName)
            setWeeks(data)
        }
        calendar()
    }, [searchUserName])

    useEffect(()=>{
        async function loadRepos() {
            const data = await fetchRepos(searchUserName)
            setRepoUsers(data)
        }
        loadRepos();
    }, [searchUserName])

    const totalCommits = weeks.flatMap(week => week.contributionDays).reduce((sum, day) => sum + day.contributionCount, 0)



    return (
        <div className='grid grid-cols-[3fr_1.5fr] bg-gradient-to-r from-gray-900 to-gray-700 border-gray-600 rounded-4xl text-white mt-2 mb-2 mx-3 flex-grow'>
        {results !== null ?
            <>
                <div className='grid grid-rows-[1fr_1fr] mt-3 mx-3'>
                    <div className='flex items-center gap-4 relative'>
                    <img src={results.avatar_url} className='rounded-full object-cover object-center self-start h-72 mt-9 mx-9 '/>
                    <div className='flex flex-col'>
                        <div className='font-bold text-3xl text-white/50 italic absolute -mt-8'>
                            {results.name}
                        </div>
                        <div className='font-bold text-5xl mr-9'>
                            {results.login}
                        </div>
                    </div>


                    {results.bio !== null ?
                        <div className='font-bold mr-9 line-clamp-7'>{results.bio}</div>
                        :
                        <div className='font-bold mx-10 line-clamp-7 gap-2 flex flex-col text-2xl'>
                            <span>👥 {results.followers} followers</span>
                            <span>➕ {results.following} following</span>
                            <span>📁 {results.public_repos} repos</span>
                        </div>
                    }
                    </div>

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

                </div>


                <div>
                    {reposUser !== null && Array.isArray(reposUser) && reposUser.map(repo => (
                        <div key={repo.name} className='bg-white/5 rounded-xl p-3 flex flex-col gap-1 hover:bg-white/10 transition-colors cursor-pointer mb-1'>
                            <div className='font-bold text-sm truncate'>{repo.name}</div>
                            <div className='text-white/50 text-xs line-clamp-2'>{repo.description}</div>
                            <div className='flex gap-3 text-xs text-white/40 mt-1'>
                                <span>{repo.language}</span>
                                <span>⭐ {repo.stargazers_count}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </>:
            <h1>Пользователь {searchUserName} не найден</h1>
        }
        </div>
    )
}