import { Dummy } from "@/components/dummy"
import { columns } from "@/components/table/data-columns"
import { DataTable } from "@/components/table/data-table"
import { Main } from "@/components/ui/main"
import { Wrapper } from "@/components/wrapper"
import {
  getCharacterStats,
  getFreeWeekCharacters,
  getMatchHistoryByUserID,
  getRankedSquadLeaderboardStats,
  getUserDataByUserID,
} from "@/lib/fetch"
import { IMinMax } from "@/types/searchParams"

export default async function LeaderboardsPage({ searchParams }: { searchParams: IMinMax }) {
  const seasonID = "19"
  const userID = "3074703"
  const next = "26715422"
  const username = "Munkie"

  // const { user: UsernameData } = getUserIDByUsername(username)
  // const { userStats: UserDataByUserID } = await getUserDataByUserID(userID, seasonID)
  // const { userGames: UserMatchHistory } = getMatchHistoryByUserID(userID)
  const { topRanks: DataLeaderboard } = await getRankedSquadLeaderboardStats(seasonID)
  // const { data: CharStat } = getCharacterStats()

  // const getRanked = getRankedSquadLeaderboardStats(seasonID)
  // const getUserData = getUserDataByUserID(userID, seasonID)

  // const [rankedData, userData] = await Promise.all([getRanked, getUserData])
  const min = searchParams.min ?? 0
  const max = searchParams.max ?? 10

  const listOfLeaderboardIDs = DataLeaderboard.slice(Number(min), Number(max)).map(({ userNum }) =>
    userNum.toString()
  )
  const promises = listOfLeaderboardIDs.map((item) => getUserDataByUserID(item, seasonID))
  const unsortedUsers = await Promise.all(promises)
  const sortedUsers = unsortedUsers
    .map((item) => item.userStats)
    .flat()
    .sort((a, b) => {
      return b.mmr - a.mmr
    })

  // http://localhost:3000/leaderboards?min=200&max=250
  //! TRY USING PARAMS AS STATE TO CONTROL THE SLICE??? https://github.com/Yezo/shadcn-playground/blob/main/app/table/components/DataTableCategorySelect.tsx

  return (
    <Main>
      {`hi there: ${searchParams.max}`}
      {/* <Dummy data={UsernameData} />
      <Dummy data={UserDataByUserID} />
      <Dummy data={UserMatchHistory} /> */}
      {/* <Dummy data={CharStat} /> */}
      {/* <Dummy data={DataLeaderboard} /> */}
      {/* <Dummy data={rankedData} />
      <Dummy data={userData} /> */}
      {/* <Dummy data={sortedUsers} /> */}
      <Wrapper data={DataLeaderboard} />

      <DataTable columns={columns} data={sortedUsers} searchParams={searchParams} />
    </Main>
  )
}
