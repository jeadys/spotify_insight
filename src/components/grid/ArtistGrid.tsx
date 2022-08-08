import Link from "next/link";

import { IUsersTopArtists } from "../../lib/interfaces/user-top-artists";

export default function ArtistGrid({ items }: IUsersTopArtists) {
  return (
    <>
      {items && items.length ? (
        <>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 5xl:grid-cols-6 6xl:grid-cols-6">
            {items.map((artist) => (
              <li
                key={artist.id}
                className="sm:bg-slate-800 rounded-lg sm:shadow sm:hover:bg-slate-700 transition ease-in-out"
              >
                <Link href={`/artists/${artist.id}`}>
                  <a className="py-6 gap-3 flex flex-col items-center">
                    <img
                      src={
                        artist.images.length && artist.images[2]
                          ? artist.images[2].url
                          : "/images/nocover.webp"
                      }
                      className="w-32 h-32 object-cover mx-auto rounded-full"
                      alt={artist.name}
                    />

                    <h3 className="text-white text-sm font-medium">{artist.name}</h3>
                    <div className="text-gray-300 text-sm italic">
                      {artist.genres[0] ? (
                        <>
                          {artist.genres[0].length < 20 ? (
                            <> {artist.genres[0]}</>
                          ) : (
                            <>{artist.genres[0].slice(0, 20).concat("...")}</>
                          )}
                        </>
                      ) : (
                        "NA"
                      )}
                    </div>

                    <span className="hidden sm:block px-2 py-1 text-xs font-medium bg-cyan-100 rounded-full max-w-max">
                      {artist.followers.total.toLocaleString()}{" "}
                      {`follower${artist.followers.total !== 1 ? "s " : " "}`}
                    </span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p className="text-white justify-center content-center text-2xl">No artists available</p>
        </>
      )}
    </>
  );
}
