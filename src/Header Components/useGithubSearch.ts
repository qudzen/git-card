import { useState, useRef } from 'react'
import type { GithubUser, SearchResponse } from '../Shared/types.tsx'
import { fetchUser, fetchHints } from '../Shared/api.tsx'

export function useGithubSearch() {
    const [searchUserName, setSearchUserName] = useState<string>('')
    const [results, setResults] = useState<GithubUser | null>(null)
    const [hints, setHints] = useState<SearchResponse | null>(null)
    const timerRef = useRef<number | null>(null)

    const search = async (searchText: string) => {
        const data: GithubUser = await fetchUser(searchText)
        setResults(data)
        console.log(data)
        console.log(searchText)
    }

    const searchHints = async (searchText: string) => {
        const data: SearchResponse = await fetchHints(searchText)
        setHints(data)
    }

    const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = event.target.value
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

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            search(searchUserName)
            setHints(null)
        }
    }

    const selectHint = (login: string) => {
        setSearchUserName(login)
        search(login)
        setHints(null)
    }

    return {
        searchUserName,
        results,
        hints,
        onSearch,
        onKeyDown,
        selectHint
    }
}