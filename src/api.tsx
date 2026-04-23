import type { GithubUser, SearchResponse } from './types'

export async function fetchUser(searchText: string):Promise<GithubUser> {
    const response = await fetch('https://api.github.com/users/' + searchText )
    const data = await response.json()
    return data
}

export async function fetchHints(searchText: string):Promise<SearchResponse>  {
    const response = await fetch('https://api.github.com/search/users?q=' + searchText + '&per_page=5')
    const data = await response.json()
    return data
}