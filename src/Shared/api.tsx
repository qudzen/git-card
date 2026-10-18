import type {ContributionWeek, GithubUser, SearchResponse, Repos, ApiError, LanguageStat} from './types.tsx'
const BASE_URL = import.meta.env.VITE_API_URL || ''
const REQUEST_TIMEOUT = 10000

function timeoutError(): ApiError {
    return { kind: 'timeout', message: 'Request timed out. Try again.' }
}

function networkError(): ApiError {
    return { kind: 'network', message: 'Network error. Check your connection.' }
}

function isTimeoutError(err: unknown): boolean {
    return err instanceof DOMException && err.name === 'TimeoutError'
}

async function request(url: string, signal?: AbortSignal): Promise<Response> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(new DOMException('Timeout', 'TimeoutError')), REQUEST_TIMEOUT)
    const onExternalAbort = () => controller.abort(signal?.reason)

    if (signal) {
        if (signal.aborted) {
            controller.abort(signal.reason)
        } else {
            signal.addEventListener('abort', onExternalAbort, { once: true })
        }
    }

    try {
        return await fetch(url, { signal: controller.signal })
    } catch (err) {
        if (signal?.aborted) throw err
        if (isTimeoutError(err)) throw timeoutError()
        throw networkError()
    } finally {
        clearTimeout(timeoutId)
        signal?.removeEventListener('abort', onExternalAbort)
    }
}

function classifyError(response: Response): ApiError {
    const remaining = response.headers.get('X-RateLimit-Remaining')
    const reset = response.headers.get('X-RateLimit-Reset')

    if (response.status === 404) {
        return { kind: 'not-found', message: 'User not found' }
    }
    if (response.status === 403 && remaining === '0') {
        return {
            kind: 'rate-limit',
            message: 'GitHub API rate limit exceeded',
            resetAt: reset ? Number(reset) : undefined
        }
    }
    if (response.status >= 500) {
        return { kind: 'server', message: 'Server error. Try again later.' }
    }
    return { kind: 'unknown', message: `Unexpected error (${response.status})` }
}

export async function fetchUser(searchText: string): Promise<GithubUser> {
    const response = await request(BASE_URL + '/api/user?username=' + encodeURIComponent(searchText))
    if (!response.ok) throw classifyError(response)
    const data = await response.json()
    if (!data || !data.login) {
        throw { kind: 'not-found', message: 'User not found' } as ApiError
    }
    return data
}

export async function fetchHints(searchText: string, signal?: AbortSignal): Promise<SearchResponse> {
    const response = await request(BASE_URL + '/api/hints?username=' + searchText, signal)
    if (!response.ok) throw classifyError(response)
    return await response.json()
}

export async function fetchContributions(searchText: string): Promise<ContributionWeek[]> {
    const response = await request(BASE_URL + '/api/contributions?username=' + searchText)
    if (!response.ok) throw classifyError(response)

    const data = await response.json()
    if (data?.errors && Array.isArray(data.errors)) {
        const rateLimited = data.errors.some((err: { type?: string }) => err?.type === 'RATE_LIMITED')
        if (rateLimited) {
            const reset = response.headers.get('X-RateLimit-Reset')
            throw {
                kind: 'rate-limit',
                message: 'GitHub API rate limit exceeded',
                resetAt: reset ? Number(reset) : undefined
            } as ApiError
        }
        throw { kind: 'server', message: 'Failed to load contributions.' } as ApiError
    }

    const weeks = data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks
    if (!weeks) return []
    return weeks
}

export async function fetchRepos(searchText: string): Promise<Repos[]> {
    const response = await request(BASE_URL + '/api/repos?username=' + searchText)
    if (!response.ok) throw classifyError(response)
    return await response.json()
}

export async function fetchLanguages(searchText: string): Promise<LanguageStat[]> {
    const response = await request(BASE_URL + '/api/languages?username=' + searchText)
    if (!response.ok) throw classifyError(response)

    const data = await response.json()
    if (data?.errors && Array.isArray(data.errors)) {
        const rateLimited = data.errors.some((err: { type?: string }) => err?.type === 'RATE_LIMITED')
        if (rateLimited) {
            const reset = response.headers.get('X-RateLimit-Reset')
            throw {
                kind: 'rate-limit',
                message: 'GitHub API rate limit exceeded',
                resetAt: reset ? Number(reset) : undefined
            } as ApiError
        }
        throw { kind: 'server', message: 'Failed to load languages.' } as ApiError
    }

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