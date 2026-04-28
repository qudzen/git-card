import type {GithubUser, Repos, ContributionWeek} from "../Shared/types.tsx";
import AvaNameBio from "./AvaNameBio.tsx";
import Calendar from "./Calendar.tsx";
import Reposs from "./Repos.tsx";


interface Props {
    results: GithubUser | null,
    reposUser: Repos[] | null,
    totalCommits: number,
    weeks: ContributionWeek[],
    loading: boolean,
    currentStreak: number,
    isActive: boolean,

}
export function Body({results, reposUser, totalCommits, weeks, loading, currentStreak, isActive}: Props){

    return (
        <>
            {results === null ? (
                <div className='flex flex-col items-center justify-center flex-grow text-white/30 bg-gradient-to-r from-gray-900 to-gray-700 border-gray-600 rounded-4xl mt-2 mb-2 mx-3'>
                    <span className='text-8xl'>🔍</span>
                    <span className='text-2xl font-bold'>Search for a GitHub user</span>
                </div>
            ) : loading ? (
                <div className='flex items-center justify-center flex-grow bg-gradient-to-r from-gray-900 to-gray-700 border-gray-600 rounded-4xl mt-2 mb-2 mx-3'>
                    <div className='w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin'/>
                </div>
            ) : (
                <div className='grid grid-cols-[3fr_1.5fr] bg-gradient-to-r from-gray-900 to-gray-700 border-gray-600 rounded-4xl text-white mt-2 mb-2 mx-3 flex-grow'>
                    <>
                        <div className='grid grid-rows-[1fr_1fr] mt-3 mx-3'>
                            <AvaNameBio results={results}/>
                            <Calendar totalCommits={totalCommits} weeks={weeks} currentStreak={currentStreak} isActive={isActive}/>
                        </div>
                        <Reposs reposUser={reposUser}/>
                    </>
                </div>
            )}
        </>
        )
}