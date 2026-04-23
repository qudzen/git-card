export interface HintUser {
    login: string
    id: number
    avatar_url: string
}

export interface GithubUser {
    login: string
    name: string | null
    avatar_url: string
    bio: string | null
    public_repos: number
    followers: number
    following: number
    created_at: string
    html_url: string
}

export interface SearchResponse {
    items: HintUser[]
    total_count: number
}