import { useState, useRef, useEffect } from 'react'
import type { GithubUser, SearchResponse } from '../Shared/types.tsx'
import { fetchUser, fetchHints } from '../Shared/api.tsx'

export function useGithubSearch() {
    const [searchUserName, setSearchUserName] = useState<string>('')
    const [results, setResults] = useState<GithubUser | null>(null)
    const [hints, setHints] = useState<SearchResponse | null>(null)
    const [notFound, setNotFound] = useState<boolean>(false)
    const hintsRef = useRef<HTMLDivElement>(null)
    const abortControllerRef = useRef<AbortController | null>(null)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const search = async (searchText: string) => {
        const data = await fetchUser(searchText)
        if (data === null) {
            setResults(null)
            setNotFound(true)
        } else {
            setResults(data)
            setNotFound(false)
        }
    }

    const searchHints = async (searchText: string) => {
        abortControllerRef.current?.abort()
        const controller = new AbortController()
        abortControllerRef.current = controller

        try {
            const data: SearchResponse = await fetchHints(searchText, controller.signal)
            if (!controller.signal.aborted) {
                setHints(data)
            }
        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                throw error
            }
        }
    }

    const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = event.target.value
        setSearchUserName(searchText)

        if (debounceRef.current) {
            clearTimeout(debounceRef.current)
        }

        if (searchText.trim() === '') {
            setHints(null)
            abortControllerRef.current?.abort()
            return
        }

        debounceRef.current = setTimeout(() => {
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

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort()
            if (debounceRef.current) {
                clearTimeout(debounceRef.current)
            }
        }
    }, [])


    return {
        searchUserName,
        results,
        hints,
        notFound,
        onSearch,
        onKeyDown,
        selectHint,
        handleLogoClick,
        hintsRef
    }
}