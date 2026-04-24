import type {ContributionWeek, GithubUser, SearchResponse, Repos} from './types'

export async function fetchUser(searchText: string):Promise<GithubUser> {
    const response = await fetch('http://localhost:3001/user?username=' + searchText)
    const data = await response.json()
    return data
}

export async function fetchHints(searchText: string):Promise<SearchResponse>  {
    const response = await fetch('http://localhost:3001/hints?username=' + searchText)
    console.log('Rate limit remaining:', response.headers.get('x-ratelimit-remaining'))
    console.log('Rate limit reset:', response.headers.get('x-ratelimit-reset'))
    const data = await response.json()
    return data
}

export async function fetchContributions (searchText: string):Promise<ContributionWeek[]>  {
    const response = await fetch('http://localhost:3001/contributions?username=' + searchText)
    const data = await response.json()
    if (!data.data.user) return []
    return data.data.user.contributionsCollection.contributionCalendar.weeks
}

export async function fetchRepos (searchText: string):Promise<Repos[] | null> {
    const response = await fetch('http://localhost:3001/repos?username=' + searchText)
    if (!response.ok) return null
    const data = await response.json()
    return data
}