import '../index.css'
import type {SearchResponse} from "../Shared/types.tsx";

interface Props {
    searchUserName: string
    hints: SearchResponse | null
    onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
    selectHint: (login: string) => void
    handleLogoClick: () => void
}

function Header(
    {
        searchUserName,
        hints,
        onSearch,
        onKeyDown,
        selectHint,
        handleLogoClick
    }: Props
) {




    return (
        <>
            <div className='bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg relative'>
                <div className='flex justify-between items-center px-8 py-4 max-w-7xl mx-auto'>
                    <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent' onClick={handleLogoClick}>
                        Git Card
                    </h1>
                    <div className='relative'>
                        <input
                            className='border-2 border-gray-600 rounded-full bg-gray-800 text-white px-6 py-3 w-80 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all'
                            type="search"
                            placeholder="🔍 SearchInput GitHub user..."
                            value={searchUserName}
                            onChange = {onSearch}
                            onKeyDown = {onKeyDown}
                        />
                        {hints && hints.items && hints.items.length > 0 && (
                            <div className='absolute top-full left-0 w-80 mt-1 border-2 border-gray-600 rounded-lg bg-gray-800 z-50 overflow-hidden shadow-xl'>
                                {hints.items.map(user => (
                                    <div onClick={() => {selectHint(user.login)}}
                                         key={user.login}
                                         className='text-white px-6 py-3 hover:bg-gray-700 cursor-pointer transition-colors'
                                    >
                                        {user.login}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header