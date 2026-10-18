import type {GithubUser, Repos, ContributionWeek, ApiError, LanguageStat} from "../Shared/types.tsx";
import AvaNameBio from "./AvaNameBio.tsx";
import Calendar from "./Calendar.tsx";
import Reposs from "./Repos.tsx";
import Languages from "./Languages.tsx";
import ErrorState from "./ErrorState.tsx";
import { FiSearch } from 'react-icons/fi'


interface Props {
    results: GithubUser | null,
    reposUser: Repos[] | null,
    weeks: ContributionWeek[],
    languages: LanguageStat[],
    loading: boolean,
    currentStreak: number,
    isActive: boolean,
    error: ApiError | null,
    retrySearch: () => void,
    bodyError: ApiError | null,
    retryBody: () => void,
}
export function Body({results, reposUser, weeks, languages, loading, currentStreak, isActive, error, retrySearch, bodyError, retryBody}: Props){
    return (
        <>
            {error ? (
                <ErrorState error={error} onRetry={retrySearch} />
            ) : results === null ? (
                <div className='flex flex-col items-center justify-center flex-grow text-slate-400 dark:text-white/30 mt-2 mb-2 mx-3'>
                    <span className='text-8xl'><FiSearch /></span>
                    <span className='text-2xl font-bold'>Search for a GitHub user</span>
                </div>
            ) : loading ? (
                <div className='flex items-center justify-center flex-grow bg-white dark:bg-ink-900 rounded-4xl mt-2 mb-2 mx-3 border border-slate-200 dark:border-ink-800 shadow-lg dark:shadow-none'>
                    <div className='w-16 h-16 border-4 border-accent-500 border-t-transparent rounded-full animate-spin'/>
                </div>
            ) : (
                <div className='grid grid-cols-1 lg:grid-cols-[3fr_1.5fr] text-slate-800 dark:text-white mt-2 mb-2 mx-3 flex-grow'>
                    {bodyError && (
                        <div className='col-span-full'>
                            <ErrorState error={bodyError} onRetry={retryBody} compact />
                        </div>
                    )}
                    <>
                        <div className='grid grid-rows-[auto_1fr] mt-3 mx-3 min-w-0'>
                            <AvaNameBio results={results}/>
                            <div className='min-w-0 overflow-hiddenq'>
                                <Calendar weeks={weeks} currentStreak={currentStreak} isActive={isActive}/>
                            </div>
                        </div>
                        <Reposs reposUser={reposUser}/>
                        <Languages languages={languages}/>
                    </>
                </div>
            )}
        </>
        )
}
