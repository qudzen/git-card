import type {ContributionWeek, GithubUser, SearchResponse, Repos} from './types.tsx'

export async function fetchUser(searchText: string):Promise<GithubUser> {
    const response = await fetch('/api/user?username=' + searchText)
    const data = await response.json()
    return data
}

export async function fetchHints(searchText: string):Promise<SearchResponse>  {
    const response = await fetch('/api/hints?username=' + searchText)
    console.log('Rate limit remaining:', response.headers.get('x-ratelimit-remaining'))
    console.log('Rate limit reset:', response.headers.get('x-ratelimit-reset'))
    const data = await response.json()
    return data
}

export async function fetchContributions (searchText: string):Promise<ContributionWeek[]>  {
    const response = await fetch('/api/contributions?username=' + searchText)
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
    const response = await fetch('/api/repos?username=' + searchText)
    if (!response.ok) return null
    const data = await response.json()
    return data
}