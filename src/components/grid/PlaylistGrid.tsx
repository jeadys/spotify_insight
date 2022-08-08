import Link from "next/link";

import { IUsersSavedPlaylists } from "../../lib/interfaces/user-saved-playlists";

export default function PlaylistGrid({ items }: IUsersSavedPlaylists) {
  return (
    <>
      {items && items.length ? (
        <>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 5xl:grid-cols-6 6xl:grid-cols-6">
            {items.map((playlist) => (
              <li
                key={playlist.id}
                className="py-4 gap-3 flex flex-col items-center text-center sm:bg-slate-800 rounded-lg sm:shadow sm:hover:bg-slate-700 transition ease-in-out"
              >
                <Link href={`/playlists/${playlist.id}`}>
                  <a>
                    <img
                      src={
                        playlist.images.length && playlist.images[0]
                          ? playlist.images[0].url
                          : "/images/nocover.webp"
                      }
                      className="w-48 h-48 object-cover rounded-md"
                      alt={playlist.name}
                    />

                    <h3 className="mt-6 text-white text-sm font-medium">
                      {playlist.name.length < 20 ? (
                        <> {playlist.name}</>
                      ) : (
                        <>{playlist.name.slice(0, 20).concat("...")}</>
                      )}
                    </h3>
                    <span className="text-xs text-gray-300">
                      {playlist.tracks.total < 50 ? playlist.tracks.total : "50"} Tracks
                    </span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <span className="flex flex-col items-center text-white">
          <span className="text-2xl">No playlists available</span>
          <Link href={`/discover/categories`}>
            <a className="bg-green-500 max-w-max py-2 px-5 rounded-md mt-2">
              Discover new playlists
            </a>
          </Link>
        </span>
      )}
    </>
  );
}
