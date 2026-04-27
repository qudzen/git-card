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


export interface ContributionResponse {
    data: ContributionUser
}

export interface ContributionUser {
    user: ContributionsCollection
}

export interface ContributionsCollection {
    contributionsCollection: ContributionCalendarWrapper
}

export interface ContributionCalendarWrapper {
    contributionCalendar: ContributionCalendar
}

export interface ContributionCalendar {
    weeks: ContributionWeek[]
}

export interface ContributionWeek {
    contributionDays: ContributionDay[]
}

export interface ContributionDay {
    date: string
    contributionCount: number
}
export interface Repos {
    name: string
    description: string | null
    language: string | null
    stargazers_count: number
    html_url: string
}