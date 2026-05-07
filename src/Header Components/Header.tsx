import '../index.css'
import type {SearchResponse} from "../Shared/types.tsx";

interface Props {
    searchUserName: string
    hints: SearchResponse | null
    onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
    selectHint: (login: string) => void
    handleLogoClick: () => void
    theme: string
    toggleTheme: () => void
}

function Header(
    {
        searchUserName,
        hints,
        onSearch,
        onKeyDown,
        selectHint,
        handleLogoClick,
        theme,
        toggleTheme
    }: Props
) {




    return (
        <>
            <div className='bg-gray-100 dark:bg-gray-800 relative'>
                <div className='flex flex-col md:flex-row justify-between items-center gap-4 px-4 md:px-8 py-4 max-w-7xl mx-auto'>
                    <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent' onClick={handleLogoClick}>
                        Git Card
                    </h1>

                    <div className='flex items-center gap-4'>
                        <div className='relative '>
                            <input
                                className='bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white border-gray-200 dark:border-gray-600 border-2 rounded-full px-6 py-3 w-full md:w-80 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all'
                                type="search"
                                placeholder="🔍 SearchInput GitHub user..."
                                value={searchUserName}
                                onChange = {onSearch}
                                onKeyDown = {onKeyDown}
                            />
                            {hints && hints.items && hints.items.length > 0 && (
                                <div className='absolute top-full left-0 w-80 mt-1 border-2 border-gray-100 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-gray-800 z-50 overflow-hidden shadow-xl'>
                                    {hints.items.map(user => (
                                        <div onClick={() => {selectHint(user.login)}}
                                             key={user.login}
                                             className='text-gray-700 dark:text-white px-6 py-3 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer transition-colors'
                                        >
                                            {user.login}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button onClick={toggleTheme} className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'>
                            {theme === 'dark' ? '🌙' : '☀️'}
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Header