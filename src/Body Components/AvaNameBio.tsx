import type {GithubUser} from "../Shared/types.tsx";

interface Props {
    results: GithubUser,
}
export default function AvaNameBio({results}: Props) {
    return (
        <div className='flex items-center gap-4 relative'>
            <img src={results.avatar_url} className='rounded-full object-cover object-center self-start h-72 mt-9 mx-9 '/>
            <div className='flex flex-col'>
                <div className='font-bold text-3xl text-gray-500 dark:text-white/50 italic absolute -mt-8'>
                    {results.name}
                </div>
                <div className='font-bold text-5xl mr-9'>
                    <a href={results.html_url} target='_blank' rel='noreferrer' className='font-bold text-5xl mr-9 text-gray-700 dark:text-white no-underline'>
                        {results.login}
                    </a>
                </div>
            </div>


            {results.bio !== null ?
                <div className='font-bold mr-9 line-clamp-7'>{results.bio}</div>
                :
                <div className='font-bold mx-12 line-clamp-7 gap-2 flex flex-col text-2xl'>
                    <span>👥 {results.followers} followers</span>
                    <span>➕ {results.following} following</span>
                    <span>📁 {results.public_repos} repos</span>
                </div>
            }
        </div>
    )
}