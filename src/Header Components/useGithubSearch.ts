import { useState, useRef, useEffect } from 'react'
import type { GithubUser, SearchResponse } from '../Shared/types.tsx'
import { fetchUser, fetchHints } from '../Shared/api.tsx'

export function useGithubSearch() {
    const [searchUserName, setSearchUserName] = useState<string>('')
    const [results, setResults] = useState<GithubUser | null>(null)
    const [hints, setHints] = useState<SearchResponse | null>(null)
    const [notFound, setNotFound] = useState<boolean>(false)
    const [activeIndex, setActiveIndex] = useState<number>(-1)
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
                setActiveIndex(-1)
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
        setActiveIndex(-1)

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
        const hintItems = hints?.items ?? []

        if (event.key === 'ArrowDown') {
            event.preventDefault()
            if (hintItems.length === 0) return
            setActiveIndex(prev => (prev + 1) % hintItems.length)
            return
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault()
            if (hintItems.length === 0) return
            setActiveIndex(prev => (prev <= 0 ? hintItems.length - 1 : prev - 1))
            return
        }

        if (event.key === 'Escape') {
            setHints(null)
            setActiveIndex(-1)
            return
        }

        if (event.key === 'Enter') {
            if (activeIndex >= 0 && hintItems[activeIndex]) {
                selectHint(hintItems[activeIndex].login)
            } else {
                search(searchUserName)
                setHints(null)
            }
        }
    }

    const selectHint = (login: string) => {
        setSearchUserName(login)
        setActiveIndex(-1)
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

    useEffect(() => {
        if (activeIndex >= 0 && hintsRef.current) {
            const items = hintsRef.current.querySelectorAll('[data-hint-index]')
            const el = items[activeIndex] as HTMLElement | undefined
            el?.scrollIntoView({ block: 'nearest' })
        }
    }, [activeIndex])


    return {
        searchUserName,
        results,
        hints,
        notFound,
        activeIndex,
        onSearch,
        onKeyDown,
        selectHint,
        handleLogoClick,
        hintsRef
    }
}