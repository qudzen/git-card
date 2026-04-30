import type {Repos} from "../Shared/types.tsx";

interface Props {
    reposUser: Repos[] | null,
}

export default function Reposs({reposUser}: Props) {
    return (
        <div>
            {reposUser !== null && Array.isArray(reposUser) && reposUser.map(repo => (
                <div key={repo.name} className='bg-white/5 rounded-xl p-3 flex flex-col gap-1 hover:bg-white/10 transition-colors cursor-pointer mb-1 items-center'>
                    <div className='font-bold text-sm truncate'>{repo.name}</div>
                    <div className='text-white/50 text-xs line-clamp-2'>{repo.description}</div>
                    <div className='flex gap-3 text-xs text-white/40 mt-1'>
                        <span>{repo.language}</span>
                        <span>⭐ {repo.stargazers_count}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}