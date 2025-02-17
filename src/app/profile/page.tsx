import { Suspense } from 'react'

import { ProfileAudioFeature } from '@/components/analysis/ProfileAudioFeature'
import { TimeRangeFilter } from '@/components/filter/TimeRangeFilter'
import { SkeletonGenreList } from '@/components/genre/SkeletonGenreList'
import { ProfileHeader } from '@/components/header/ProfileHeader'
import { SkeletonHeader } from '@/components/header/SkeletonHeader'
import { Section } from '@/components/layout/Section'
import { TopArtist } from '@/components/profile/TopArtist'
import { TopGenre } from '@/components/profile/TopGenre'
import { TopTrack } from '@/components/profile/TopTrack'
import { Skeleton } from '@/components/skeleton/Skeleton'
import { SkeletonAudioFeature } from '@/components/skeleton/SkeletonAudioFeature'
import { RecentTrackList } from '@/components/track/RecentTrackList'
import { SkeletonTrackList } from '@/components/track/SkeletonTrackList'
import { SkeletonScatter } from '@/components/skeleton/SkeletonScatter'

export default async function page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const timeRange = searchParams.timeRange || 'short'

  return (
    <>
      <Suspense fallback={<SkeletonHeader imageShape="round" hideStatistics />}>
        <ProfileHeader />
      </Suspense>

      <TimeRangeFilter />

      {/* <Section title="Top Stats" description="Past" timeRange={timeRange}>
        <Suspense
          fallback={
            <>
              <SkeletonAudioFeature contentAmount={6} />
              <SkeletonScatter />
            </>
          }
        >
          <ProfileAudioFeature timeRange={timeRange} />
        </Suspense>
      </Section> */}

      <Section title="Top Genres" description="Past" timeRange={timeRange}>
        <Suspense key={timeRange} fallback={<SkeletonGenreList contentAmount={12} />}>
          <TopGenre timeRange={timeRange} />
        </Suspense>
      </Section>

      <Section title="Top Artists" description="Past" timeRange={timeRange}>
        <Suspense
          key={timeRange}
          fallback={<Skeleton gridFlow="leftRight" imageSize="small" imageShape="round" contentAmount={12} gridSize="compact" />}
        >
          <TopArtist timeRange={timeRange} />
        </Suspense>
      </Section>

      <Section title="Top Tracks" description="Past" timeRange={timeRange}>
        <Suspense
          key={timeRange}
          fallback={<Skeleton gridFlow="leftRight" imageSize="small" imageShape="square" contentAmount={12} gridSize="compact" />}
        >
          <TopTrack timeRange={timeRange} />
        </Suspense>
      </Section>

      <Section title="Recent Streams" description="Enjoying these tracks">
        <Suspense fallback={<SkeletonTrackList contentAmount={12} />}>
          <RecentTrackList />
        </Suspense>
      </Section>
    </>
  )
}
