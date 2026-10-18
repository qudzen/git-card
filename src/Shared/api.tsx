import type {ContributionWeek, GithubUser, SearchResponse, Repos, LanguageStat} from './types.tsx'
const BASE_URL = import.meta.env.VITE_API_URL || ''

export async function fetchUser(searchText: string):Promise<GithubUser | null> {
    const response = await fetch(BASE_URL + '/api/user?username=' + encodeURIComponent(searchText))
    if (!response.ok) return null
    const data = await response.json()
    if (!data || !data.login) return null
    return data
}

export async function fetchHints(searchText: string, signal?: AbortSignal):Promise<SearchResponse>  {
    const response = await fetch(BASE_URL + '/api/hints?username=' + searchText, { signal })
    const data = await response.json()
    return data
}

export async function fetchContributions (searchText: string):Promise<ContributionWeek[]>  {
    const response = await fetch(BASE_URL + '/api/contributions?username=' + searchText)
    const data = await response.json()
    if (data.errors) {
        return []
    }

    const weeks = data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks

    if (!weeks) {
        return []
    }

    return weeks
}

export async function fetchRepos (searchText: string):Promise<Repos[] | null> {
    const response = await fetch(BASE_URL + '/api/repos?username=' + searchText)
    if (!response.ok) return null
    const data = await response.json()
    return data
}

export async function fetchLanguages(searchText: string): Promise<LanguageStat[]> {
    const response = await fetch(BASE_URL + '/api/languages?username=' + searchText)
    if (!response.ok) return []
    const data = await response.json()
    if (data.errors) return []

    const nodes = data?.data?.user?.repositories?.nodes
    if (!Array.isArray(nodes)) return []

    const totals = new Map<string, number>()
    const colors = new Map<string, string>()

    for (const repo of nodes) {
        const edges = repo?.languages?.edges
        if (!Array.isArray(edges)) continue
        for (const edge of edges) {
            const name = edge?.node?.name
            const size = edge?.size
            if (typeof name !== 'string' || typeof size !== 'number') continue
            totals.set(name, (totals.get(name) ?? 0) + size)
            if (edge?.node?.color && !colors.has(name)) {
                colors.set(name, edge.node.color)
            }
        }
    }

    const grandTotal = [...totals.values()].reduce((sum, s) => sum + s, 0)
    if (grandTotal === 0) return []

    return [...totals.entries()]
        .map(([name, size]) => ({
            name,
            size,
            color: colors.get(name) ?? '#6366f1',
            percent: Math.round((size / grandTotal) * 1000) / 10
        }))
        .sort((a, b) => b.size - a.size)
        .slice(0, 6)
}
