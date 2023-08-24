import "./globals.css"
import type { Metadata } from "next"
import { Inter, Spectral, Rubik, Manrope } from "next/font/google"
import { ThemeProvider } from "../components/themes/theme-provider"
import { DesktopNavbar } from "@/components/navbar/desktop/navbar-desktop"

export const metadata: Metadata = {
  title: "ERBS",
  description: "A modern web application for managing your job applications",
}

const spectral = Spectral({
  variable: "--font-spectral",
  weight: ["200", "300", "400", "500", "600"],
  display: "swap",
  subsets: ["latin"],
})

const inter = Inter({
  variable: "--font-inter",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  subsets: ["latin"],
})

const rubik = Rubik({
  variable: "--font-rubik",
  weight: ["300", "400", "500", "600"],
  display: "swap",
  subsets: ["latin"],
})

const manrope = Manrope({
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  subsets: ["latin"],
})
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${spectral.variable} ${inter.variable} ${rubik.variable} ${manrope.variable} `}
    >
      <body className="min-h-screen bg-background font-manrope antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <DesktopNavbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
