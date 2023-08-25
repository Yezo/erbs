// /v1/freeCharacters/{matchingMode} === free week chars
// /v1/games/{gameId} === an individual game's stats
// /v1/rank/top/{seasonId}/{matchingTeamMode} === top ranks for a season
// /v1/rank/{userNum}/{seasonId}/{matchingTeamMode} === rank stats for a singular person
// /v1/user/games/{userNum} === match history of a singular person
// /v1/weaponRoutes/recommend
// /v1/weaponRoutes/recommend/{routeId}
// /v1/user/games/{userNum}
// /v1/rank/{userNum}/{seasonId}/{matchingTeamMode}
// /v1/games/{gameId}
// /v1/freeCharacters/{matchingMode}

import { ICharacterStats } from "@/types/getCharacterStats"
import { IGetFreeWeekCharacters } from "@/types/getFreeWeekCharacters"
import { IGetMatchHistoryByUserID } from "@/types/getMatchHistoryByUserID"
import { IGetRankedSquadLeaderboardStats } from "@/types/getRankedSquadLeaderboardStats"
import { IGetUserDataByUserID } from "@/types/getUserDataByUserID"
import { IGetUserIDByUsername } from "@/types/getUserIDByUsername"

//returns a Username + their UserNum ID
export async function getUserIDByUsername(ID: string | undefined): Promise<IGetUserIDByUsername> {
  const data = await fetch(`${process.env.BASE_API_URL}/user/nickname?query=${ID}`, {
    method: "GET",
    headers: { "x-api-key": `${process.env.API_KEY}` },
    cache: "no-store",
  })

  if (!data.ok) throw new Error("Failed to fetch data")
  return data.json()
}

// returns User Stats
export async function getUserDataByUserID(
  ID: string | undefined,
  SEASON_ID: string | undefined
): Promise<IGetUserDataByUserID> {
  const data = await fetch(`${process.env.BASE_API_URL}/user/stats/${ID}/${SEASON_ID}`, {
    method: "GET",
    headers: { "x-api-key": `${process.env.API_KEY}` },
    next: { revalidate: 1800 },
  })

  if (!data.ok) throw new Error("Failed to fetch data")
  return data.json()
}

// free week characters? seems to only work when ID is "2"
export async function getFreeWeekCharacters(
  ID: string | undefined
): Promise<IGetFreeWeekCharacters> {
  const data = await fetch(`${process.env.BASE_API_URL}/freeCharacters/${ID}`, {
    method: "GET",
    headers: { "x-api-key": `${process.env.API_KEY}` },
    cache: "no-store",
  })

  if (!data.ok) throw new Error("Failed to fetch data")
  return data.json()
}

// returns User Stats
export async function getMatchHistoryByUserID(
  ID: string | undefined
): Promise<IGetMatchHistoryByUserID> {
  const data = await fetch(`${process.env.BASE_API_URL}/user/games/${ID}`, {
    method: "GET",
    headers: { "x-api-key": `${process.env.API_KEY}` },
    cache: "no-store",
  })

  if (!data.ok) throw new Error("Failed to fetch data")
  return data.json()
}

export async function getCharacterStats(ID?: string | undefined): Promise<ICharacterStats> {
  const data = await fetch(`${process.env.BASE_API_URL}/data/Character`, {
    method: "GET",
    headers: { "x-api-key": `${process.env.API_KEY}` },
    cache: "no-store",
  })

  if (!data.ok) throw new Error("failed to fetch data")
  return data.json()
}

export async function getRankedSquadLeaderboardStats(
  seasonID: string | undefined
): Promise<IGetRankedSquadLeaderboardStats> {
  const data = await fetch(`${process.env.BASE_API_URL}/rank/top/${seasonID}/3?per_page=5'`, {
    method: "GET",
    headers: { "x-api-key": `${process.env.API_KEY}` },
    next: { revalidate: 1800 },
  })

  if (!data.ok) throw new Error("Failed to fetch data")
  return data.json()
}
