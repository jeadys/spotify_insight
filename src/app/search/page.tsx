import Section from '@/components/layout/Section'
import AlbumList from '@/components/list/AlbumList'
import { getNewReleases } from '@/server/api'

export default async function page() {
  const newReleases = await getNewReleases(50)

  return (
    <Section title="New Releases" description="Albums to explore">
      <AlbumList albums={newReleases.albums.items} />
    </Section>
  )
}
