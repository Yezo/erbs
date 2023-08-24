"use client"
import { ListOfCharacterCodes } from "@/lib/characterCodes"
import {
  calculateCurrentLP,
  calculateWinPercentage,
  calculateTop3Percentage,
  calculateMostPlayedCharacterUsageRate,
} from "@/lib/utils"
import { IUserStat } from "@/types/getUserDataByUserID"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"

export const columns: ColumnDef<IUserStat>[] = [
  {
    accessorKey: "rank",
    header: () => <div className="text-center font-bold">Rank</div>,
    cell: ({ row }) => {
      const index = row.index
      return <div className="text-center text-xs font-semibold">{index + 1}</div>
    },
  },
  {
    accessorKey: "nickname",
    header: () => <div className="font-bold">Player</div>,
    cell: ({ row }) => {
      const player = row.original.nickname
      const mostPlayedChamp = row.original.characterStats[0].characterCode
      const list = ListOfCharacterCodes.filter(({ characterCode }) => {
        if (characterCode === mostPlayedChamp) {
          return characterCode
        }
      })
      return (
        <>
          {list.map(({ name }, index) => (
            <div className="flex items-center gap-2 text-xs font-semibold" key={index}>
              <Image
                src={`/characters/${name}.png`}
                alt="Yep"
                width={400}
                height={32}
                className="h-9 w-9 rounded-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-rose-100 to-teal-100 object-cover shadow-sm ring-1 ring-black/10 dark:bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] dark:from-sky-400 dark:to-indigo-900 dark:ring-secondary/90"
              />
              {player}
            </div>
          ))}
        </>
      )
    },
  },
  {
    id: "tier",
    // accessorKey: "mmr",
    header: () => <div className="text-center font-bold">Tier</div>,
    cell: ({ row }) => {
      const mmr = row.original.mmr
      return (
        <div className="flex items-center justify-center gap-2 text-xs font-semibold">
          <Image src="/rank/ImmortalRank.png" alt="Yep" width={25} height={25}></Image>
          {Number(mmr) >= 6000 && "Immortal"}
        </div>
      )
    },
  },
  {
    accessorKey: "mmr",
    header: () => <div className="text-center font-bold">RP</div>,
    cell: ({ row }) => {
      const mmr = row.original.mmr
      return (
        <div className="flex items-center justify-center gap-2 text-xs font-bold">
          {calculateCurrentLP(mmr)}
        </div>
      )
    },
  },
  {
    accessorKey: "totalGames",
    header: () => <div className="text-center font-bold">Games</div>,
    cell: ({ row }) => {
      const totalGames = row.original.totalGames
      return (
        <div className="text-center text-xs font-semibold text-muted-foreground">{totalGames}</div>
      )
    },
  },
  {
    accessorKey: "totalWins",
    header: () => <div className="text-center font-bold">Win %</div>,
    cell: ({ row }) => {
      const totalWins = row.original.totalWins
      const totalGames = row.original.totalGames
      return (
        <div className="text-center text-xs font-semibold text-muted-foreground">
          {calculateWinPercentage(totalWins, totalGames)}
        </div>
      )
    },
  },
  {
    accessorKey: "top3",
    header: () => <div className="text-center font-bold">Top 3</div>,
    cell: ({ row }) => {
      const top3 = row.original.top3
      return (
        <div className="text-center text-xs font-semibold text-muted-foreground">
          {calculateTop3Percentage(top3)}
        </div>
      )
    },
  },
  {
    accessorKey: "characterStats",
    header: () => <div className="text-center font-bold">Most Played</div>,
    cell: ({ row }) => {
      const mostPlayed = row.original.characterStats
      const totalGames = row.original.totalGames

      return (
        <div className="mx-auto grid max-w-[11rem] grid-cols-3">
          {mostPlayed.map((item) => {
            const list = ListOfCharacterCodes.filter(({ characterCode }) => {
              if (characterCode === item.characterCode) {
                return characterCode
              }
            })
            return (
              <div
                className="flex flex-col items-center justify-center text-xs font-semibold text-muted-foreground"
                key={item.characterCode}
              >
                {list.map(({ name }, index) => (
                  <Image
                    src={`/characters/${name}.png`}
                    alt="Yep"
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-rose-100 to-teal-100 object-cover shadow-sm ring-1 ring-black/10 dark:bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] dark:from-sky-400 dark:to-indigo-900 dark:ring-secondary/90"
                    key={`${name}${index}`}
                  />
                ))}
                <span>{calculateMostPlayedCharacterUsageRate(item.totalGames, totalGames)}</span>
              </div>
            )
          })}
        </div>
      )
    },
  },
]
