import { formatDuration } from "../../utils";
import { PlayTrack, ChooseTrack } from "../TrackContext";
import { Link } from "react-router-dom";

export default function TrackGrid({ tracks }) {
  const playingTrack = PlayTrack();
  const chooseTrack = ChooseTrack();

  return (
    <>
      {tracks && tracks.length ? (
        <>
          <table className="w-full text-white">
            <tbody className="">
              {tracks.map((track, index) => (
                <tr
                  key={track.id}
                  className={`${
                    playingTrack === track.uri
                      ? "bg-sky-600 sticky"
                      : "hover:bg-slate-700 cursor-pointer"
                  }`}
                  onClick={() => chooseTrack(track.uri)}
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div className="flex items-center">
                      <span className="mr-4">{index + 1}</span>

                      {"album" in track && (
                        <div className="h-10 w-10 flex-shrink-0">
                          {track.album.images.length &&
                          track.album.images[0] ? (
                            <img
                              className="h-10 w-10 rounded-md"
                              src={track.album.images[0].url}
                              alt={track.name}
                            />
                          ) : (
                            <img
                              className="h-10 w-10 rounded-md"
                              src="/images/nocover.webp"
                              alt={track.name}
                            />
                          )}
                        </div>
                      )}

                      <div className="ml-4">
                        <div className="font-semibold">{track.name}</div>
                        {"album" in track ? (
                          <>
                            {track.album.artists.map((artist, index) => (
                              <span
                                key={artist.id}
                                className="text-xs text-gray-300 hover:underline"
                              >
                                <Link to={`/artists/${artist.id}`}>
                                  {artist.name}
                                </Link>

                                {index < track.album.artists.length - 1
                                  ? ", "
                                  : ""}
                              </span>
                            ))}
                          </>
                        ) : (
                          <>
                            {track.artists.map((artist, index) => (
                              <span
                                key={artist.id}
                                className="text-xs text-gray-300 hover:underline"
                              >
                                <Link to={`/artists/${artist.id}`}>
                                  {artist.name}
                                </Link>

                                {index < track.artists.length - 1 ? ", " : ""}
                              </span>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                  {"album" in track && (
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                      <Link to={`/albums/${track.album.id}`}>
                        <div className=" hover:underline">
                          {track.album.name}
                        </div>
                      </Link>
                    </td>
                  )}
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <div className="">{formatDuration(track.duration_ms)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <p className="text-white justify-center content-center text-2xl">
            No tracks available
          </p>
        </>
      )}
    </>
  );
}
