import './index.css'
import {useRef, useState} from "react";

function Header() {
    interface HintUser {
        login: string
        id: number
        avatar_url: string
    }

    interface GithubUser {
        login: string
        name: string | null
        avatar_url: string
        bio: string | null
        public_repos: number
        followers: number
        following: number
        created_at: string
        html_url: string
    }

    interface SearchResponse {
        items: HintUser[]
        total_count: number
    }

    const [searchUserName, setSearchUserName] = useState<string>('')
    const [results, setResults] = useState<GithubUser | null>(null)
    const [hints, setHints] = useState<SearchResponse | null>(null)


    const timerRef = useRef<number | null>(null)

    const [selectUser, setSelectUser] = useState<boolean | null>(false)

//    async function search(searchText: string):Promise<void> {
//        const response = await fetch('https://api.github.com/users/' + searchText )
//        const data = await response.json()
//        console.log(data)
//        setResults(data)
//        console.log(searchUserName)
//    }

//    async function searchHints(searchText: string):Promise<void>  {
//        const response = await fetch('https://api.github.com/search/users?q=' + searchText + '&per_page=5')
//        const data = await response.json()
//        setHints(data)
//        console.log(data.items)
//    }

//    const onSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
//        const searchText = (event.target.value)
//        setSearchUserName(searchText)
//        if (timerRef.current) clearTimeout(timerRef.current)
//        if (searchText.trim() === '') {
//            setResults(null)
//            setHints(null)
//            return
//        }
//        timerRef.current = setTimeout(() => {
//            searchHints(searchText)
//        }, 300)
//    }

//    const enterSearch = (event: React.KeyboardEvent<HTMLInputElement>): void => {
//        if (event.key === 'Enter') {
//            setSelectUser(true)
//            search(searchUserName)
//        }
//    }




    console.log(searchUserName)



    return (
        <div>
        <div className='bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg relative'>
            <div className='flex justify-between items-center px-8 py-4 max-w-7xl mx-auto'>
                <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
                    Git Card
                </h1>
                <div className='relative'>
                    <input
                        className='border-2 border-gray-600 rounded-full bg-gray-800 text-white px-6 py-3 w-80 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all'
                        type="search"
                        placeholder="🔍 Search GitHub user..."
                        value={searchUserName}
                        onChange = {onSearch}
                        onKeyDown = {enterSearch}
                    />
                    {selectUser === false && hints !== null && (
                        <div className='absolute top-full left-0 w-80 mt-1 border-2 border-gray-600 rounded-lg bg-gray-800 z-50 overflow-hidden shadow-xl'>
                            {hints.items.map(user => (
                                <div onClick={() => {
                                    setSearchUserName(user.login)
                                    search(user.login)
                                    setSelectUser(null)
                                    }}
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
            {results !== null ?
                <div>{results.name}</div> :
                <h1>Пользователь {searchUserName} не найден</h1>
            }
        </div>

    )
}
export default Header