import Link from "next/link";

import { IArtistsAlbums } from "../../lib/interfaces/artist-album";

export default function AlbumGrid({ items }: IArtistsAlbums) {
  return (
    <>
      {items && items.length ? (
        <>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 5xl:grid-cols-6 6xl:grid-cols-6">
            {items.map((album) => (
              <li
                key={album.id}
                className="py-4 gap-3 flex flex-col items-center text-center sm:bg-slate-800 rounded-lg sm:shadow sm:hover:bg-slate-700 transition ease-in-out"
              >
                <Link href={`/albums/${album.id}`}>
                  <a>
                    <img
                      src={
                        album.images.length && album.images[1]
                          ? album.images[1].url
                          : "/images/nocover.webp"
                      }
                      className="w-48 h-48 object-cover rounded-md"
                      alt={album.name}
                    />

                    <h3 className="mt-4 text-white text-sm font-medium">
                      {album.name.length < 20 ? (
                        <> {album.name}</>
                      ) : (
                        <>{album.name.slice(0, 20).concat("...")}</>
                      )}
                    </h3>
                  </a>
                </Link>

                <Link href={`/artists/${album.artists[0].id}`}>
                  <a className="text-xs text-gray-300 hover:underline">{album.artists[0].name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <span className="flex flex-col items-center text-white">
          <span className="text-2xl">No albums available</span>
          <Link href={`/discover/new-releases`}>
            <a className="bg-green-500 max-w-max py-2 px-5 rounded-md mt-2">Discover new albums</a>
          </Link>
        </span>
      )}
    </>
  );
}
