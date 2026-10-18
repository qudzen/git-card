import '../index.css'
import type {SearchResponse} from "../Shared/types.tsx";
import { FiSearch, FiMoon, FiSun } from 'react-icons/fi'

interface Props {
    searchUserName: string
    hints: SearchResponse | null
    activeIndex: number
    onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
    selectHint: (login: string) => void
    handleLogoClick: () => void
    theme: string
    toggleTheme: () => void
    hintsRef: React.RefObject<HTMLDivElement | null>
}

function Header(
    {
        searchUserName,
        hints,
        activeIndex,
        onSearch,
        onKeyDown,
        selectHint,
        handleLogoClick,
        theme,
        toggleTheme,
        hintsRef,
    }: Props
) {




    return (
        <>
            <div className='bg-slate-50/70 dark:bg-ink-950/60 backdrop-blur-md relative border-b border-slate-200 dark:border-ink-800'>
                <div className='flex flex-col md:flex-row justify-between items-center gap-4 px-4 md:px-8 py-4 max-w-7xl mx-auto'>
                    <h1 className='text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-accent-500 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent cursor-pointer drop-shadow-sm' onClick={handleLogoClick}>
                        Git Card
                    </h1>

                    <div className='flex items-center gap-4'>
                        <div className='relative '>
                            <FiSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/40 pointer-events-none' />
                            <input
                                className='bg-white dark:bg-ink-900 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-white/40 border-slate-200 dark:border-ink-700 border rounded-full pl-11 pr-6 py-3 w-full md:w-80 focus:outline-none focus:border-accent-500 focus:ring-4 focus:ring-accent-500/20 shadow-sm dark:shadow-none transition-all'
                                type="search"
                                placeholder="Search GitHub user..."
                                value={searchUserName}
                                onChange = {onSearch}
                                onKeyDown = {onKeyDown}
                            />
                            {hints && hints.items && hints.items.length > 0 && (
                                <div ref={hintsRef} className='absolute top-full left-0 w-80 mt-2 border border-slate-200 dark:border-ink-700 rounded-2xl bg-white dark:bg-ink-900 z-50 overflow-hidden shadow-2xl shadow-black/20 dark:shadow-black/60'>
                                    {hints.items.map((user, index) => (
                                        <div onClick={() => {selectHint(user.login)}}
                                             key={user.login}
                                             data-hint-index={index}
                                             className={`text-slate-700 dark:text-white/80 px-6 py-3 cursor-pointer transition-colors ${index === activeIndex ? 'bg-accent-500/10 text-accent-600 dark:text-accent-300' : 'hover:bg-accent-500/10 hover:text-accent-600 dark:hover:text-accent-300'}`}
                                        >
                                            {user.login}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button onClick={toggleTheme} className='p-2.5 rounded-full border border-slate-200 dark:border-ink-700 hover:bg-slate-100 dark:hover:bg-ink-800 hover:scale-105 active:scale-95 transition-all text-slate-500 dark:text-white/70'>
                            {theme === 'dark' ? <FiMoon size={20}/> : <FiSun size={20}/>}
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Header