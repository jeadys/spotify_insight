import { Suspense } from 'react'

import { SkeletonAlbumList } from '@/components/album/SkeletonAlbumList'
import { GeneratorCreate } from '@/components/generator/GeneratorCreate'
import { GeneratorRangeSlider } from '@/components/generator/GeneratorRangeSlider'
import { GeneratorReset } from '@/components/generator/GeneratorReset'
import { GeneratorSearch } from '@/components/generator/GeneratorSearch'
import { GeneratorSearchList } from '@/components/generator/GeneratorSearchList'
import { GeneratorSeedList } from '@/components/generator/GeneratorSeedList'
import { SkeletonGenerator } from '@/components/generator/SkeletonGenerator'
import { Section } from '@/components/layout/Section'
import { SavedPlayList } from '@/components/playlist/SavedPlaylist'

export default async function Generator({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const search = searchParams.search

  return (
    <>
      <Section title="Seeds" description="Seeds based on artists and tracks">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-5">
            <GeneratorSearch />
            <Suspense key={search} fallback={<SkeletonGenerator contentAmount={3} />}>
              <GeneratorSearchList searchParams={search} />
            </Suspense>
          </div>
          <GeneratorSeedList />
        </div>
      </Section>

      <Section title="Attributes" description="Fine tune based on attributes.">
        <div className="grid gap-5 sm:grid-cols-2">
          <GeneratorRangeSlider
            title="danceability"
            description="Based on tempo, rhythm stability, beat strength, and overall regularity."
            min={0}
            max={100}
            step={1}
            gap={20}
          />

          <GeneratorRangeSlider
            title="energy"
            description="Represents a perceptual measure of intensity and activity."
            min={0}
            max={100}
            step={1}
            gap={20}
          />

          <GeneratorRangeSlider
            title="popularity"
            description="Based on the total number of plays the track has had and how recent those plays are."
            min={0}
            max={100}
            step={1}
            gap={20}
          />

          <GeneratorRangeSlider
            title="valence"
            description="High values correspond to positivity and happiness, while low values correspond to negativity and sadness."
            min={0}
            max={100}
            step={1}
            gap={20}
          />

          <GeneratorRangeSlider
            title="instrumentalness"
            description="Values above 50 represent instrumental tracks."
            min={0}
            max={100}
            step={1}
            gap={20}
          />

          <GeneratorRangeSlider
            title="acousticness"
            description="A confidence measure of whether the track is acoustic."
            min={0}
            max={100}
            step={1}
            gap={20}
          />
        </div>
      </Section>

      <div className="flex flex-wrap justify-between gap-5">
        <GeneratorCreate />
        <GeneratorReset />
      </div>

      <Section title="Public Playlists" description="In your library">
        <Suspense fallback={<SkeletonAlbumList contentAmount={12} />}>
          <SavedPlayList />
        </Suspense>
      </Section>
    </>
  )
}
