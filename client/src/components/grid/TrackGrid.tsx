import { PlayTrack, ChooseTrack } from "../TrackContext";
import { formatDuration, stopProp } from "../../utils";
import { Link } from "react-router-dom";
import { ITracks } from "../../common/interfaces/tracks";
import MusicBar from "../MusicBar";
import { getDoesUserHaveTrackSaved } from "../../spotify";
import { useQuery } from "react-query";
import { SaveTrack } from "../button";

export default function TrackGrid({ items }: ITracks) {
  const playingTrack = PlayTrack();
  const chooseTrack = ChooseTrack();
  const track_ids = items.map((track) => track.id).join(",");

  const fetchDoesUserHaveTrackSaved = async () => {
    const trackSaved = await getDoesUserHaveTrackSaved(track_ids);
    return trackSaved.data;
  };

  const { data: trackSaved } = useQuery(
    ["track-saved", track_ids],
    fetchDoesUserHaveTrackSaved,
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      {items && items.length ? (
        <>
          <table className="w-full text-white">
            <tbody className="">
              {items.map((track, index) => (
                <tr
                  key={track.id}
                  className={`${
                    playingTrack === track.uri
                      ? "bg-sky-600"
                      : "hover:bg-slate-700 cursor-pointer"
                  }`}
                  onClick={() => chooseTrack(track.uri)}
                >
                  <td className="whitespace-nowrap py-4 px-3 text-sm">
                    <div className="flex items-center">
                      <div className="w-7 text-center">
                        {playingTrack === track.uri ? (
                          <MusicBar />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      {"album" in track && track.album && (
                        <div className="h-10 w-10 flex-shrink-0">
                          {track.album.images.length &&
                          track.album.images[2] ? (
                            <img
                              className="h-10 w-10 object-cover rounded-md"
                              src={track.album.images[2].url}
                              alt={track.name}
                            />
                          ) : (
                            <img
                              className="h-10 w-10 object-cover rounded-md"
                              src="/images/nocover.webp"
                              alt={track.name}
                            />
                          )}
                        </div>
                      )}

                      <div className="ml-4">
                        <div className="font-semibold">
                          {track.name.length < 20 ? (
                            <> {track.name}</>
                          ) : (
                            <>{track.name.slice(0, 20).concat("...")}</>
                          )}
                        </div>
                        {"album" in track && track.album ? (
                          <>
                            {track.album.artists.map((artist, index) => (
                              <span
                                key={artist.id}
                                className="text-xs text-gray-300 hover:underline"
                              >
                                <Link
                                  to={`/artists/${artist.id}`}
                                  onClick={(e) => stopProp(e)}
                                >
                                  {artist.name}
                                </Link>

                                {index < track.album!.artists.length - 1
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
                                <Link
                                  to={`/artists/${artist.id}`}
                                  onClick={(e) => stopProp(e)}
                                >
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
                  {"album" in track && track.album && (
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 album:hidden">
                      <span className="text-xs text-gray-300 hover:underline">
                        <Link
                          to={`/albums/${track.album.id}`}
                          onClick={(e) => stopProp(e)}
                        >
                          {track.album.name.length < 20 ? (
                            <> {track.album.name}</>
                          ) : (
                            <>{track.album.name.slice(0, 20).concat("...")}</>
                          )}
                        </Link>
                      </span>
                    </td>
                  )}
                  <td className="whitespace-nowrap px-3 py-4 text-sm duration:hidden flex justify-end gap-5">
                    {trackSaved && (
                      <SaveTrack id={track.id} saved={trackSaved[index]} />
                    )}
                    <span className="block w-7">
                      {formatDuration(track.duration_ms)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <span className="flex flex-col items-center text-white">
          <span className="text-2xl">No tracks available</span>
          <Link
            to={`/discover`}
            className="bg-green-500 max-w-max py-2 px-5 rounded-md mt-2"
          >
            Discover new tracks
          </Link>
        </span>
      )}
    </>
  );
}
