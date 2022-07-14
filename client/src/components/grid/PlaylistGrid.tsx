import { Link } from "react-router-dom";
import { IUsersPlaylists } from "../../common/interfaces/usersPlaylists";

export default function PlaylistGrid({ items }: IUsersPlaylists) {
  return (
    <>
      {items && items.length ? (
        <>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 5xl:grid-cols-6 6xl:grid-cols-6">
            {items.map((playlist) => (
              <li
                key={playlist.id}
                className="col-span-1 flex flex-col text-center bg-slate-800 rounded-lg shadow hover:bg-slate-700 transition ease-in-out cursor-pointer"
              >
                <Link to={`/playlists/${playlist.id}`}>
                  <div className="flex-1 flex flex-col p-4">
                    {playlist.images.length && playlist.images[0] ? (
                      <img
                        className="w-44 h-44 object-cover  mx-auto rounded-md"
                        src={playlist.images[0].url}
                        alt={playlist.name}
                      />
                    ) : (
                      <img
                        className="w-44 h-44 object-cover  mx-auto rounded-md"
                        src="/images/nocover.webp"
                        alt={playlist.name}
                      />
                    )}
                    <h3 className="mt-6 text-white text-sm font-medium">
                      {playlist.name.length < 20 ? (
                        <> {playlist.name}</>
                      ) : (
                        <>{playlist.name.slice(0, 20).concat("...")}</>
                      )}
                    </h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p className="text-white justify-center content-center text-2xl">
            No playlists available
          </p>
        </>
      )}
    </>
  );
}
