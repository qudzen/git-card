import {useEffect, useState} from "react";
import type {ContributionWeek, GithubUser, Repos} from "../Shared/types.tsx";
import {fetchContributions, fetchRepos} from "../Shared/api.tsx";

export function useBodyLogic(user: GithubUser | null) {

    const [reposUser, setRepoUsers] = useState<Repos[] | null>(null)
    const [weeks, setWeeks] = useState<ContributionWeek[]>([])
    const [loading , setLoading] = useState<boolean>(false);
    const [currentStreak, setCurrentStreak] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);

    const calculateStreak = (weeksData: ContributionWeek[]) => {
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

        console.log('🎯 Has today?', hasToday)
        console.log('🎯 Has yesterday?', hasYesterday)
        const active = hasToday || hasYesterday
        console.log('🔥 Active streak?', active)
        console.log('📊 Final streak value:', streak)

        setCurrentStreak(active ? streak : 0)
        setIsActive(active)
    }



    useEffect(() => {
        if (!user) {
            setRepoUsers([])
            setWeeks([])
            return
        }
        const userLogin = user.login
        async function loadData() {
            setLoading(true)
            try {
                const [reposData, weeksData] = await Promise.all([
                    fetchRepos(userLogin),
                    fetchContributions(userLogin)
                ])
                setRepoUsers(reposData)
                setWeeks(weeksData)
                calculateStreak(weeksData)
            }finally {
                setLoading(false)
            }
        }
        loadData()
    }, [user])



    const totalCommits = weeks?.flatMap(week => week.contributionDays)
        ?.reduce((sum, day) => sum + day.contributionCount, 0) ?? 0



    return {
        reposUser,
        totalCommits,
        weeks,
        loading,
        currentStreak,
        isActive,
    }
}
