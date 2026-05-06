import type {GithubUser} from "../Shared/types.tsx";
import {useState} from "react";

interface Props {
    results: GithubUser,
}
export default function AvaNameBio({results}: Props) {
    const [imgError, setImgError] = useState<boolean>(false)
    return (
        <div className='grid grid-cols-[auto_200px_1fr] items-center gap-6 p-6'>

            <div className='flex-shrink-0'>
                {imgError ? (
                    <div className='rounded-full h-72 w-72 bg-gray-700 flex items-center justify-center text-6xl'>
                        {results.login[0].toUpperCase()}
                    </div>
                ) : (
                    <img
                        src={results.avatar_url}
                        onError={() => setImgError(true)}
                        className='rounded-full object-cover object-center h-72 w-72'
                    />
                )}
            </div>

            <div className='flex flex-col relative ml-5'>
                <div className='font-bold text-2xl text-gray-500 dark:text-white/50 italic truncate'>
                    {results.name}
                </div>
                <a href={results.html_url} target='_blank' rel='noreferrer' className='font-bold text-4xl dark:text-white truncate'>
                    {results.login}
                </a>
            </div>

            <div className='min-w-0'>
                {results.bio !== null ?
                    <div className='font-bold line-clamp-4'>{results.bio}</div>
                    :
                    <div className='flex flex-col gap-2 text-2xl font-bold'>
                        <span>👥 {results.followers} followers</span>
                        <span>➕ {results.following} following</span>
                        <span>📁 {results.public_repos} repos</span>
                    </div>
                }
            </div>

        </div>
    )
}