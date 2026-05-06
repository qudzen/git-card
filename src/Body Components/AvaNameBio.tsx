import type {GithubUser} from "../Shared/types.tsx";
import {useState} from "react";

interface Props {
    results: GithubUser,
}
export default function AvaNameBio({results}: Props) {
    const [imgError, setImgError] = useState<boolean>(false)
    return (
        <div className='flex items-center relative'>
            {imgError ? (
                <div className='rounded-full h-72 w-72 bg-gray-300 dark:bg-gray-700  flex items-center justify-center text-6xl mt-9 mx-9 object-cover object-center'>
                    {results.login[0].toUpperCase()}
                </div>
                ) : (
                <img src={results.avatar_url}
                     onError={() => setImgError(true)}
                     className='rounded-full object-cover object-center self-start h-72 w-72 mt-9 mx-9 '
                />
            )}
            <div className='flex flex-col ml-3'>
                <div className='font-bold text-3xl text-gray-500 dark:text-white/50 italic absolute -mt-8'>
                    {results.name}
                </div>
                <div className='font-bold text-5xl '>
                    <a href={results.html_url} target='_blank' rel='noreferrer' className='font-bold text-5xl  text-gray-700 dark:text-white no-underline'>
                        {results.login}
                    </a>
                </div>
            </div>


            {results.bio !== null ?
                <div className='font-bold mr-9 line-clamp-7 mx-auto'>{results.bio}</div>
                :
                <div className='font-bold mx-auto line-clamp-7 gap-2 flex flex-col text-2xl'>
                    <span>👥 {results.followers} followers</span>
                    <span>➕ {results.following} following</span>
                    <span>📁 {results.public_repos} repos</span>
                </div>
            }
        </div>
    )
}