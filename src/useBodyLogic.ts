import {useEffect, useState} from "react";
import type {ContributionWeek, Repos} from "./types.tsx";
import {fetchContributions, fetchRepos} from "./api.tsx";

export function useBodyLogic(searchUserName: string) {

    const [reposUser, setRepoUsers] = useState<Repos[] | null>(null)
    const [weeks, setWeeks] = useState<ContributionWeek[]>([])

    useEffect(() => {
        async function calendar() {
            const data = await fetchContributions(searchUserName)
            setWeeks(data)
        }
        calendar()
    }, [searchUserName])

    useEffect(()=>{
        async function loadRepos() {
            const data = await fetchRepos(searchUserName)
            setRepoUsers(data)
        }
        loadRepos();
    }, [searchUserName])

    const totalCommits = weeks.flatMap(week => week.contributionDays).reduce((sum, day) => sum + day.contributionCount, 0)

    return {
        reposUser,
        totalCommits,
        weeks,
    }
}
