import '../styles/globals.css'

import Navigation from '@/components/core/Navigation'
import NextAuthWrapper from '@/components/core/NextAuthWrapper'
import ReactQueryWrapper from '@/components/core/ReactQueryWrapper'
import ScrollToTop from '@/components/core/ScrollToTop'
import PlayedTrackProvider from 'providers/PlayedTrackProvider'

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head />
      <body>
        <ReactQueryWrapper>
          <NextAuthWrapper>
            <PlayedTrackProvider>
              <ScrollToTop />
              <div className="min-h-screen bg-gray-900 font-maven">
                <div className="min-h-screen">
                  <div className="mx-auto max-w-8xl p-5">
                    <Navigation />
                    {children}
                  </div>
                </div>
              </div>
              <div id="trackplayer"></div>
            </PlayedTrackProvider>
          </NextAuthWrapper>
        </ReactQueryWrapper>
      </body>
    </html>
  )
}
