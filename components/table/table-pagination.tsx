"use client"
import { Table } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { IMinMax } from "@/types/searchParams"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  searchParams: IMinMax
}

export function DataTablePagination<TData>({
  table,
  searchParams,
}: DataTablePaginationProps<TData>) {
  //States
  const router = useRouter()

  const addNums = (first: number, second: number) => {
    return first + second
  }

  let min = Number(searchParams.min)
  let max = Number(searchParams.max)

  const handleGoToPreviousPage = () => {
    if (min === 0) {
      return
    }
    if (min && min > 0 && max && max > 50) {
      let newMin = min - 50
      let newMax = max - 50
      router.push(`/leaderboards?min=${newMin}&max=${newMax}`)
    }
  }

  const handleGoToNextPage = () => {
    if (min === 0 && max === 50) {
      router.push("/leaderboards?min=50&max=100")
    }
    //!TODO THIS CONCATENATES INTSEAD OF ADDING FOR SOME REASON? XD
    if (min && max && min !== 0 && max !== 50) {
      let newMin = addNums(min, 50)
      let newMax = addNums(max, 50)

      router.push(`/leaderboards?min=${newMin}&max=${newMax}`)
    }
  }

  const handleDisablePrevious = () => {
    if (min === 0) {
      return true
    }
    return false
  }

  const handleDisableNext = () => {
    if (max <= 1000) {
      return false
    }
    return true
  }

  return (
    <div className="flex min-w-full items-center justify-end px-8 py-4">
      <div className="flex min-w-full items-center justify-between gap-4 lg:gap-6">
        <div className="flex items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            // onClick={() => table.previousPage()}
            onClick={handleGoToPreviousPage}
            disabled={handleDisablePrevious()}
          >
            <span className="sr-only">Go to previous page</span>

            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            // onClick={() => table.nextPage()}
            onClick={handleGoToNextPage}
            disabled={handleDisableNext()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
