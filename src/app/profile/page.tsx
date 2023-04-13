import { Suspense } from 'react'

import { dehydrate, Hydrate } from '@tanstack/react-query'

import getQueryClient from '@/components/core/getQueryClient'
import ProfileFilter from '@/components/filter/ProfileFilter'
import Section from '@/components/layout/Section'
import RecentStream from '@/components/profile/RecentStream'
import TopArtist from '@/components/profile/TopArtist'
import TopGenre from '@/components/profile/TopGenre'
import TopTrack from '@/components/profile/TopTrack'
import Skeleton from '@/components/skeleton/Skeleton'
import { getTopArtists, getTopTracks } from '@/server/api'

export default async function page() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(['topArtists', 'short_term'], () => getTopArtists('short_term', 12))
  await queryClient.prefetchQuery(['topTracks', 'short_term'], () => getTopTracks('short_term', 12))
  const dehydratedState = dehydrate(queryClient)

  return (
    <>
      <ProfileFilter />

      <Hydrate state={dehydratedState}>
        <Section title="Top Genres" description="Past several years">
          <TopGenre />
        </Section>

        <Section title="Top Artists" description="Past several years">
          <Suspense fallback={<Skeleton gridFlow="leftRight" imageSize="small" imageShape="round" contentAmount={12} gridSize="compact" />}>
            <TopArtist />
          </Suspense>
        </Section>

        <Section title="Top Tracks" description="Past several years">
          <Suspense
            fallback={<Skeleton gridFlow="leftRight" imageSize="small" imageShape="square" contentAmount={12} gridSize="compact" />}
          >
            <TopTrack />
          </Suspense>
        </Section>
      </Hydrate>

      <Section title="Recent Streams" description="Enjoying these tracks">
        {/* @ts-expect-error Server Component */}
        <RecentStream />
      </Section>
    </>
  )
}
