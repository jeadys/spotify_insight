import '@/styles/globals.css'

import { Saira } from 'next/font/google'

import NextAuthWrapper from '@/components/core/NextAuthWrapper'
import ReactQueryWrapper from '@/components/core/ReactQueryWrapper'
import ScrollToTop from '@/components/core/ScrollToTop'
import Navigation from '@/components/layout/Navigation'
import Playback from '@/components/playback/Playback'

const saira = Saira({
  subsets: ['latin'],
  variable: '--font-saira',
})

type Props = {
  children: React.ReactNode
}

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={saira.className}>
      <head />
      <body>
        <NextAuthWrapper>
          <ReactQueryWrapper>
            <ScrollToTop />
            <div className="min-h-screen bg-gray-1300">
              <div className="mx-auto min-h-screen max-w-7xl py-5 px-6 sm:px-10">
                <Navigation />
                <main className="grid-col grid gap-10">{children}</main>
              </div>
            </div>
            <div className="sticky bottom-0 z-20">
              <Playback />
            </div>
          </ReactQueryWrapper>
        </NextAuthWrapper>
      </body>
    </html>
  )
}
