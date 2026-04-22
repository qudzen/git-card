function Search() {
    async function search(searchText: string):Promise<void> {
        const response = await fetch('https://api.github.com/users/' + searchText )
        const data = await response.json()
        console.log(data)
        setResults(data)
//        console.log(searchUserName)
    }

    async function searchHints(searchText: string):Promise<void>  {
        const response = await fetch('https://api.github.com/search/users?q=' + searchText + '&per_page=5')
        const data = await response.json()
        setHints(data)
        console.log(data.items)
    }

    const onSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const searchText = (event.target.value)
        setSearchUserName(searchText)
        if (timerRef.current) clearTimeout(timerRef.current)
        if (searchText.trim() === '') {
            setResults(null)
            setHints(null)
            return
        }
        timerRef.current = setTimeout(() => {
            searchHints(searchText)
        }, 300)
    }

    const enterSearch = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            setSelectUser(true)
            search(searchUserName)
        }
    }
}
export default Search;