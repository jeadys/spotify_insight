import Link from 'next/link'

import type { IUsersSavedPlaylists } from '../../lib/interfaces/user-saved-playlists'
import DiscoverButton from '../button/DiscoverButton'
import { CardGrid, CardImage, CardInfo, CardItem, CardName } from '../card'

export default function PlaylistGrid({ items }: IUsersSavedPlaylists) {
  return (
    <>
      {items && items.length ? (
        <>
          <ul>
            <CardGrid>
              {items.map((playlist) => (
                <li key={playlist.id}>
                  <CardItem>
                    <Link href={`/playlists/${playlist.id}`}>
                      <CardImage image={playlist.images.length ? playlist.images[0].url : '/images/nocover.webp'} alt={playlist.name} />

                      <CardName name={playlist.name} />

                      <CardInfo info={playlist.tracks.total < 50 ? `${playlist.tracks.total.toString()} Tracks` : '50 Tracks'} />
                    </Link>
                  </CardItem>
                </li>
              ))}
            </CardGrid>
          </ul>
        </>
      ) : (
        <DiscoverButton titleMessage="No playlists found" buttonMessage="Discover new playlists" />
      )}
    </>
  )
}
