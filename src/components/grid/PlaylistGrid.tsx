import Image from "next/image";
import Link from "next/link";

import { IUsersSavedPlaylists } from "../../lib/interfaces/user-saved-playlists";

export default function PlaylistGrid({ items }: IUsersSavedPlaylists) {
  return (
    <>
      {items && items.length ? (
        <>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 5xl:grid-cols-6 6xl:grid-cols-6">
            {items.map((playlist) => (
              <li
                key={playlist.id}
                className="bg-slate-800 rounded-lg shadow hover:bg-slate-700 transition ease-in-out"
              >
                <Link href={`/playlists/${playlist.id}`}>
                  <a className="py-4 flex flex-col items-center">
                    <Image
                      src={
                        playlist.images.length && playlist.images[0]
                          ? playlist.images[0].url
                          : "/images/nocover.webp"
                      }
                      className="object-cover rounded-md"
                      width={192}
                      height={192}
                      layout="fixed"
                      alt={playlist.name}
                    />

                    <h3 className="mt-6 text-white text-sm font-medium">
                      {playlist.name.length < 20 ? (
                        <> {playlist.name}</>
                      ) : (
                        <>{playlist.name.slice(0, 20).concat("...")}</>
                      )}
                    </h3>
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
