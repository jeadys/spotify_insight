import { Link } from "react-router-dom";
import { IArtistsAlbums } from "../../common/interfaces/artistsAlbums";
import { getDoesUserHaveAlbumSaved } from "../../spotify";
import { useQuery } from "react-query";
import { SaveAlbum } from "../button";
import { useRoutes } from "react-router-dom";

export default function AlbumGrid({ items }: IArtistsAlbums) {
  // let savedAlbums: string[] = [];
  // if (items && items.length) savedAlbums = items.map((item) => item.id);

  // const fetchIsSaved = async () => {
  //   const isAlbumSaved = await getDoesUserHaveAlbumSaved(savedAlbums);
  //   return isAlbumSaved.data;
  // };

  // const { data: isSaved } = useQuery(["is-saved", savedAlbums], fetchIsSaved);

  return (
    <>
      {items && items.length ? (
        <>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 5xl:grid-cols-6 6xl:grid-cols-6">
            {items.map((album, index) => (
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
                  {/* <SaveAlbum id={savedAlbums[index]} saved={isSaved[index]} /> */}
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p className="text-white justify-center content-center text-2xl">
            No albums available
          </p>
        </>
      )}
    </>
  );
}
