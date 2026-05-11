import { useState, useRef, useEffect } from 'react'
import type { GithubUser, SearchResponse } from '../Shared/types.tsx'
import { fetchUser, fetchHints } from '../Shared/api.tsx'

export function useGithubSearch() {
    const [searchUserName, setSearchUserName] = useState<string>('')
    const [results, setResults] = useState<GithubUser | null>(null)
    const [hints, setHints] = useState<SearchResponse | null>(null)
    const hintsRef = useRef<HTMLDivElement>(null)

    const search = async (searchText: string) => {
        const data: GithubUser = await fetchUser(searchText)
        setResults(data)
    }

    const searchHints = async (searchText: string) => {
        const data: SearchResponse = await fetchHints(searchText)
        setHints(data)
    }

    const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = event.target.value
        setSearchUserName(searchText)

        if (searchText.trim() === '') {
            setResults(null)
            setHints(null)
            return
        }

        searchHints(searchText)
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
    const handleLogoClick = () => {
        window.location.reload()
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (hintsRef.current && !hintsRef.current.contains(e.target as Node)) {
                setHints(null)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])


    return {
        searchUserName,
        results,
        hints,
        onSearch,
        onKeyDown,
        selectHint,
        handleLogoClick,
        hintsRef
    }
}