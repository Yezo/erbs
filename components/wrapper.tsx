"use client"

import { getUserDataByUserID } from "@/lib/fetch"
import { TopRanks } from "@/types/getRankedSquadLeaderboardStats"
import { IUserStat } from "@/types/getUserDataByUserID"
import { useState } from "react"
import { useParams, useSearchParams } from "next/navigation"

type Props = {
  data: TopRanks[] | IUserStat[]
}
export const Wrapper = ({ data }: Props) => {
  const [cock, setCock] = useState(data)
  const [limit, setLimit] = useState([0, 10])
  const seasonID = "19"
  //   console.log(cock.slice(limit[0], limit[1]))
  const params = useParams()
  const min = useSearchParams().get("min")
  const max = useSearchParams().get("max")
  const listOfLeaderboardIDs = cock.map(({ userNum }) => userNum.toString())

  const testFunc = async () => {
    const listOfLeaderboardIDs = cock
      .map(({ userNum }) => userNum.toString())
      .slice(limit[0], limit[1])

    const promises = listOfLeaderboardIDs.map((item) => getUserDataByUserID(item, seasonID))
    const unsortedUsers = await Promise.all(promises)
    const sortedUsers = unsortedUsers
      .map((item) => item.userStats)
      .flat()
      .sort((a, b) => {
        return b.mmr - a.mmr
      })
    // setCock(sortedUsers)
    console.log(sortedUsers)
  }
  //   console.log(listOfLeaderboardIDs.slice(limit[0], limit[1]))
  console.log(cock)
  return (
    <div className="flex flex-col gap-2">
      {min && min}
      {max && max}
      <button onClick={() => setLimit([0, 10])}>0-10</button>
      <button onClick={() => setLimit([10, 20])}>10-20</button>
      <button onClick={testFunc}>Call</button>
    </div>
  )
}
