import { ThemeToggle } from "@/components/themes/theme-toggle"
import Link from "next/link"

export const DesktopNavbar = () => {
  return (
    <nav className="h-16 border-b">
      <div className="container mx-auto flex h-full items-center justify-between md:px-32">
        <ul className="flex items-center gap-2 font-semibold">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/leaderboards?min=0&max=50">Leaderboards</Link>
          </li>
        </ul>

        <div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
