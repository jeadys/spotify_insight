import Link from "next/link";
import { IArtistsAlbums } from "../../lib/interfaces/artistsAlbums";

export default function AlbumGrid({ items }: IArtistsAlbums) {
  return (
    <>
      {items && items.length ? (
        <>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 5xl:grid-cols-6 6xl:grid-cols-6">
            {items.map((album) => (
              <li
                key={album.id}
                className="text-center bg-slate-800 rounded-lg shadow hover:bg-slate-700 transition ease-in-out"
              >
                <Link to={`/albums/${album.id}`} className="cursor-pointer">
                  <div className="p-4">
                    {album.images.length && album.images[1] ? (
                      <img
                        className="w-48 h-48 object-cover mx-auto rounded-md"
                        src={album.images[1].url}
                        alt={album.name}
                      />
                    ) : (
                      <img
                        className="w-48 h-48 object-cover mx-auto rounded-md"
                        src="/images/nocover.webp"
                        alt={album.name}
                      />
                    )}
                    <h3 className="mt-6 text-white text-sm font-medium">
                      {album.name.length < 20 ? (
                        <> {album.name}</>
                      ) : (
                        <>{album.name.slice(0, 20).concat("...")}</>
                      )}
                    </h3>
                  </div>
                </Link>
                <div className="mb-5">
                  <Link
                    className="text-xs text-gray-300 hover:underline block w-max mx-auto"
                    to={`/artists/${album.artists[0].id}`}
                  >
                    {album.artists[0].name}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <span className="flex flex-col items-center text-white">
          <span className="text-2xl">No albums available</span>
          <Link
            to={`/discover/new-releases`}
            className="bg-green-500 max-w-max py-2 px-5 rounded-md mt-2"
          >
            Discover new albums
          </Link>
        </span>
      )}
    </>
  );
}
