import { Link } from "react-router-dom";

export default function PlaylistGrid({ playlists }) {
  return (
    <>
      {playlists && playlists.length ? (
        <>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 5xl:grid-cols-6 6xl:grid-cols-6">
            {playlists.map((playlist) => (
              <li
                key={playlist.id}
                className="col-span-1 flex flex-col text-center bg-slate-800 rounded-lg shadow hover:bg-slate-700 transition ease-in-out cursor-pointer"
              >
                <Link to={`/playlists/${playlist.id}`}>
                  <div className="flex-1 flex flex-col p-4">
                    {playlist.images.length && playlist.images[0] && (
                      <img
                        className="w-42 h-42 flex-shrink-0 mx-auto rounded-md"
                        src={playlist.images[0].url}
                        alt={playlist.name}
                      />
                    )}
                    <h3 className="mt-6 text-white text-sm font-medium">
                      {playlist.name}
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
