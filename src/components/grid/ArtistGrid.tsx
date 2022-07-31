import { useQuery } from "react-query";
import Link from "next/link";
import { IUsersTopArtists } from "../../lib/interfaces/usersTopArtists";
import { getDoesUserFollowArtist } from "../../spotify";

export default function ArtistGrid({ items }: IUsersTopArtists) {
  return (
    <>
      {items && items.length ? (
        <>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 5xl:grid-cols-6 6xl:grid-cols-6">
            {items.map((artist) => (
              <li
                key={artist.id}
                className="col-span-1 flex flex-col text-center bg-slate-800 rounded-lg shadow hover:bg-slate-700 transition ease-in-out cursor-pointer"
              >
                <Link to={`/artists/${artist.id}`}>
                  <div className="flex-1 flex flex-col p-8">
                    {artist.images.length && artist.images[2] ? (
                      <img
                        className="w-32 h-32 object-cover mx-auto rounded-full"
                        src={artist.images[2].url}
                        alt={artist.name}
                      />
                    ) : (
                      <img
                        className="w-32 h-32 object-cover mx-auto rounded-full"
                        src="/images/nocover.webp"
                        alt={artist.name}
                      />
                    )}
                    <h3 className="mt-6 text-white text-sm font-medium">
                      {artist.name}
                    </h3>
                    <dl className="mt-1 flex-grow flex flex-col justify-between">
                      <dt className="sr-only">Title</dt>
                      <dd className="text-gray-300 text-sm italic">
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
                      </dd>
                      <dd className="mt-3">
                        <span className="px-2 py-1 text-xs font-medium bg-cyan-100 rounded-full">
                          {artist.followers.total.toLocaleString()}{" "}
                          {`follower${
                            artist.followers.total !== 1 ? "s " : " "
                          }`}
                        </span>
                      </dd>
                    </dl>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p className="text-white justify-center content-center text-2xl">
            No artists available
          </p>
        </>
      )}
    </>
  );
}
