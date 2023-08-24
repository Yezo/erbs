export interface IGetRankedSquadLeaderboardStats {
  code: number
  message: string
  topRanks: TopRanks[]
}

export interface TopRanks {
  userNum: number
  nickname: string
  rank: number
  mmr: number
  userEmblems: any[]
}
