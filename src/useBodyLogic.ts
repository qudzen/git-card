import {useEffect, useState} from "react";
import type {ContributionWeek, Repos} from "./types.tsx";
import {fetchContributions, fetchRepos} from "./api.tsx";

export function useBodyLogic(searchUserName: string) {

    const [reposUser, setRepoUsers] = useState<Repos[] | null>(null)
    const [weeks, setWeeks] = useState<ContributionWeek[]>([])
    const [loading , setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function loadData() {
            setLoading(true)
            const data = await fetchContributions(searchUserName)
            setWeeks(data)
            const repos = await fetchRepos(searchUserName)
            setRepoUsers(repos)
            setLoading(false)
        }
        loadData()
    }, [searchUserName])



    const totalCommits = weeks.flatMap(week => week.contributionDays).reduce((sum, day) => sum + day.contributionCount, 0)

    return {
        reposUser,
        totalCommits,
        weeks,
        loading,
    }
}
