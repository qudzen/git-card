import './index.css'
import {useState} from "react";

function Header() {
    const [searchUserName, setSearchUserName] = useState('')
    const [results, setResults] = useState(null)
    const [searchText, setSearchText] = useState('')

    async function search() {
        const response = await fetch('https://api.github.com/users/' + searchText )
        const data = await response.json()
        console.log(data)
        setResults(data)
        console.log(searchUserName)
    }

    const onSearch = (event) => {
        setSearchText(event.target.value)
        setSearchUserName(searchText)
        if (searchText.trim() === '') {
            setResults([])
            return
        }
        search()

    }


    console.log(searchUserName)



    return (
        <div>
        <div className='bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg'>
            <div className='flex justify-between items-center px-8 py-4 max-w-7xl mx-auto'>
                <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
                    Git Card
                </h1>
                <input
                    className='border-2 border-gray-600 rounded-full bg-gray-800 text-white px-6 py-3 w-80 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all'
                    type="search"
                    placeholder="🔍 Search GitHub user..."
                    value={searchUserName}
                    onChange = {onSearch}
                />
            </div>
        </div>
            {results !== null ?
                <div>{results.name}</div> :
                <h1>Пользователь {searchUserName} не найден</h1>}
        </div>

    )
}
export default Header