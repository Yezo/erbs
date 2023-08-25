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

  // const listOfLeaderboardIDs = DataLeaderboard.slice(Number(min), Number(max)).map(({ userNum }) =>
  //   userNum.toString()
  // )
  // const promises = listOfLeaderboardIDs.map((item) => getUserDataByUserID(item, seasonID))
  // const unsortedUsers = await Promise.all(promises)
  // const sortedUsers = unsortedUsers
  //   .map((item) => item.userStats)
  //   .flat()
  //   .sort((a, b) => {
  //     return b.mmr - a.mmr
  //   })
  //Sort 1000 players by MMR before-hand
  const sorted = DataLeaderboard.sort((a, b) => b.mmr - a.mmr)

  //Slice data by params
  const slice = sorted.slice(Number(min), Number(max))

  //Get all the ranks and IDs from sliced data
  const nums = slice.map(({ rank }) => rank)
  const ids = slice.map(({ userNum }) => userNum.toString())

  //Fetch data by ID
  const promises = ids.map((item) => getUserDataByUserID(item, seasonID))
  const unsortedUsers = await Promise.all(promises)
  const users = unsortedUsers.map((item) => item.userStats).flat()
  const final = users.map((item, index) => ({ ...item, ranking: nums[index] }))

  // const transformData = async () => {
  //   //Sort 1000 players by MMR before-hand
  //   const sorted = DataLeaderboard.sort((a, b) => b.mmr - a.mmr)

  //   //Slice data by params
  //   const slice = sorted.slice(Number(min), Number(max))

  //   //Get all the ranks and IDs from sliced data
  //   const nums = slice.map(({ rank }) => rank)
  //   const ids = slice.map(({ userNum }) => userNum.toString())

  //   //Fetch data by ID
  //   const promises = ids.map((item) => getUserDataByUserID(item, seasonID))
  //   const unsortedUsers = await Promise.all(promises)
  //   const users = unsortedUsers.map((item) => item.userStats).flat()
  //   // const final = users.map((item, index) => ({ ...item, ranking: nums[index] }))
  //   // const sliced = final.slice(Number(min), Number(max))
  //   return users
  // }

  return (
    <Main>
      {/* <Dummy data={UsernameData} />
      <Dummy data={UserDataByUserID} />
      <Dummy data={UserMatchHistory} /> */}
      {/* <Dummy data={CharStat} /> */}
      {/* <Dummy data={DataLeaderboard} /> */}
      {/* <Dummy data={rankedData} />
      <Dummy data={userData} /> */}
      {/* <Dummy data={sortedUsers} /> */}
      <Dummy data={final} />
      {/* <Wrapper data={DataLeaderboard} /> */}

      <DataTable columns={columns} data={final} searchParams={searchParams} />
    </Main>
  )
}
