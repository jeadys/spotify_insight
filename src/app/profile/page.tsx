import { Suspense } from 'react'

import Section from '@/components/layout/Section'
import RecentStream from '@/components/profile/RecentStream'
import TopArtist from '@/components/profile/TopArtist'
import TopGenre from '@/components/profile/TopGenre'
import TopTrack from '@/components/profile/TopTrack'

export default async function page() {
  return (
    <>
      <Section title="Top Genres" description="Past several years">
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <TopGenre />
        </Suspense>
      </Section>

      <Section title="Top Artists" description="Past several years">
        {/* @ts-expect-error Server Component */}
        <TopArtist />
      </Section>

      <Section title="Top Tracks" description="Past several years">
        {/* @ts-expect-error Server Component */}
        <TopTrack />
      </Section>

      <Section title="Recent Streams" description="Enjoying these tracks">
        {/* @ts-expect-error Server Component */}
        <RecentStream />
      </Section>
    </>
  )
}
