import {useEffect, useState, useCallback} from "react";
import type {ContributionWeek, GithubUser, Repos, ApiError, LanguageStat} from "../Shared/types.tsx";
import {fetchContributions, fetchRepos, fetchLanguages} from "../Shared/api.tsx";

export function useBodyLogic(user: GithubUser | null) {

    const [reposUser, setRepoUsers] = useState<Repos[] | null>(null)
    const [weeks, setWeeks] = useState<ContributionWeek[]>([])
    const [languages, setLanguages] = useState<LanguageStat[]>([])
    const [loading , setLoading] = useState<boolean>(false);
    const [currentStreak, setCurrentStreak] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [error, setError] = useState<ApiError | null>(null)

    const calculateStreak = useCallback((weeksData: ContributionWeek[]) => {
        const allDays = weeksData.flatMap(week => week.contributionDays)
        const activeDays = allDays
            .filter(day => day.contributionCount > 0)
            .map(day => day.date)
            .sort()

        if (activeDays.length === 0) {
            setCurrentStreak(0)
            setIsActive(false)
            return
        }
        let streak = 1

        for (let i = 0; i < activeDays.length; i++) {
            const prevDate = new Date(activeDays[i - 1])
            const currDate = new Date(activeDays[i])
            const diffDays = (currDate.getTime() - prevDate.getTime()) / (1000 * 3600 * 24)

            if (diffDays === 1) {
                streak++
            } else if (diffDays > 1) {
                streak = 1
            }
        }
        const now = new Date()
        const todayStr = now.toISOString().split('T')[0]
        const yesterdayStr = new Date(now.getTime() - 86400000).toISOString().split('T')[0]


        const hasToday = activeDays.includes(todayStr)
        const hasYesterday = activeDays.includes(yesterdayStr)

        const active = hasToday || hasYesterday

        setCurrentStreak(active ? streak : 0)
        setIsActive(active)
    }, [])

    const loadData = useCallback(async (userLogin: string) => {
        setLoading(true)
        setError(null)
        try {
            const [reposData, weeksData, languagesData] = await Promise.all([
                fetchRepos(userLogin),
                fetchContributions(userLogin),
                fetchLanguages(userLogin)
            ])
            setRepoUsers(reposData)
            setWeeks(weeksData)
            setLanguages(languagesData)
            calculateStreak(weeksData)
        } catch (err) {
            setError(err as ApiError)
        } finally {
            setLoading(false)
        }
    }, [calculateStreak])

    useEffect(() => {
        if (!user) {
            setRepoUsers([])
            setWeeks([])
            setLanguages([])
            setError(null)
            return
        }
        loadData(user.login)
    }, [user, loadData])

    const retry = () => {
        if (user) {
            loadData(user.login)
        }
    }

    return {
        reposUser,
        weeks,
        languages,
        loading,
        currentStreak,
        isActive,
        error,
        retry,
    }
}
