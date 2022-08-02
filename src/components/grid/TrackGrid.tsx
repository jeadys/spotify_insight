import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

import { ITracks } from "../../lib/interfaces/tracks";
import { getDoesUserHaveTrackSaved } from "../../lib/spotify";
import { formatDuration, stopProp } from "../../lib/utils";
import MusicBar from "../MusicBar";
import { ChooseTrack, PlayTrack } from "../TrackContext";
import { SaveTrack } from "../button";

export default function TrackGrid({ items }: ITracks) {
  const trackIds = items.map((track) => track.id).join(",");
  const trackUris = items.map((track) => track.uri);
  const [saveState, setSaveState] = useState<boolean[]>();
  const playingTrack = PlayTrack();
  const chooseTrack = ChooseTrack();

  const fetchDoesUserHaveTrackSaved = async () => {
    const isTrackSaved = await getDoesUserHaveTrackSaved(trackIds);
    return isTrackSaved.data;
  };

  const { data: isTrackSaved } = useQuery(
    ["is-track-saved", trackIds],
    fetchDoesUserHaveTrackSaved,
    {
      onSuccess: setSaveState,
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
                    playingTrack === track.uri ? "bg-sky-600" : "hover:bg-slate-700 cursor-pointer"
                  }`}
                  onClick={() => chooseTrack(trackUris, track.uri)}
                >
                  <td className="whitespace-nowrap py-4 px-3 text-sm">
                    <div className="flex items-center">
                      <div className="w-7 text-center">
                        {playingTrack === track.uri ? <MusicBar /> : <span>{index + 1}</span>}
                      </div>
                      {"album" in track && track.album && (
                        <div className="h-10 w-10 flex-shrink-0">
                          {track.album.images.length && track.album.images[2] ? (
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
                                <Link href={`/artists/${artist.id}`}>
                                  <a onClick={(e) => stopProp(e)}>{artist.name}</a>
                                </Link>

                                {index < track.album!.artists.length - 1 ? ", " : ""}
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
                                <Link href={`/artists/${artist.id}`}>
                                  <a onClick={(e) => stopProp(e)}>{artist.name}</a>
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
                        <Link href={`/albums/${track.album.id}`}>
                          <a onClick={(e) => stopProp(e)}>
                            {track.album.name.length < 20 ? (
                              <> {track.album.name}</>
                            ) : (
                              <>{track.album.name.slice(0, 20).concat("...")}</>
                            )}
                          </a>
                        </Link>
                      </span>
                    </td>
                  )}
                  <td className="whitespace-nowrap px-3 py-4 text-sm duration:hidden flex justify-end gap-5">
                    {isTrackSaved && saveState ? (
                      <span onClick={(e) => stopProp(e)}>
                        <SaveTrack id={track.id} saved={saveState[index]} />
                      </span>
                    ) : (
                      <SaveTrack id={track.id} saved={false} />
                    )}
                    <span className="block w-7">{formatDuration(track.duration_ms)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <span className="flex flex-col items-center text-white">
          <span className="text-2xl">No tracks available</span>
          <Link href={`/discover`}>
            <a className="bg-green-500 max-w-max py-2 px-5 rounded-md mt-2">Discover new tracks</a>
          </Link>
        </span>
      )}
    </>
  );
}
