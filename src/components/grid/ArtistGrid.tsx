import Link from "next/link";

import { IUsersTopArtists } from "../../lib/interfaces/user-top-artists";
import DiscoverButton from "../button/DiscoverButton";
import { CardGrid, CardImage, CardInfo, CardItem, CardName } from "../card";

export default function ArtistGrid({ items }: IUsersTopArtists) {
  return (
    <>
      {items && items.length ? (
        <>
          <ul>
            <CardGrid>
              {items.map((artist) => (
                <li key={artist.id}>
                  <Link href={`/artists/${artist.id}`}>
                    <a>
                      <CardItem>
                        <CardImage
                          image={
                            artist.images.length && artist.images[2]
                              ? artist.images[2].url
                              : "/images/nocover.webp"
                          }
                          alt={artist.name}
                          rounded={true}
                        />
                        <CardName name={artist.name} />

                        <CardInfo info={artist.genres[0] ? artist.genres[0] : "N/A"} />

                        <span className="hidden sm:block px-2 py-1 text-xs font-medium bg-cyan-100 rounded-full mt-5">
                          {artist.followers.total.toLocaleString()}{" "}
                          {`follower${artist.followers.total !== 1 ? "s " : " "}`}
                        </span>
                      </CardItem>
                    </a>
                  </Link>
                </li>
              ))}
            </CardGrid>
          </ul>
        </>
      ) : (
        <DiscoverButton titleMessage="No artists found" buttonMessage="Discover new artists" />
      )}
    </>
  );
}
