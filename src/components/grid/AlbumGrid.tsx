import Link from "next/link";

import { IArtistsAlbums } from "../../lib/interfaces/artist-album";
import DiscoverButton from "../button/DiscoverButton";
import { CardGrid, CardImage, CardInfo, CardItem, CardName } from "../card";

export default function AlbumGrid({ items }: IArtistsAlbums) {
  return (
    <>
      {items && items.length ? (
        <>
          <ul>
            <CardGrid>
              {items.map((album) => (
                <li key={album.id}>
                  <CardItem>
                    <Link href={`/albums/${album.id}`}>
                      <a>
                        <CardImage
                          image={
                            album.images.length && album.images[1]
                              ? album.images[1].url
                              : "/images/nocover.webp"
                          }
                          alt={album.name}
                        />

                        <CardName name={album.name} />
                      </a>
                    </Link>

                    <Link href={`/artists/${album.artists[0].id}`}>
                      <a className="hover:underline hover:decoration-white">
                        <CardInfo info={album.artists[0].name} />
                      </a>
                    </Link>
                  </CardItem>
                </li>
              ))}
            </CardGrid>
          </ul>
        </>
      ) : (
        <DiscoverButton titleMessage="No albums found" buttonMessage="Discover new albums" />
      )}
    </>
  );
}
