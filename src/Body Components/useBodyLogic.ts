import {useEffect, useState} from "react";
import type {ContributionWeek, GithubUser, Repos} from "../Shared/types.tsx";
import {fetchContributions, fetchRepos} from "../Shared/api.tsx";

export function useBodyLogic(user: GithubUser | null) {

    const [reposUser, setRepoUsers] = useState<Repos[] | null>(null)
    const [weeks, setWeeks] = useState<ContributionWeek[]>([])
    const [loading , setLoading] = useState<boolean>(false);

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
    }
}
