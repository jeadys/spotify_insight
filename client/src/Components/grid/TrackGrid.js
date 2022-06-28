import { formatDuration } from "../../utils";

export default function TrackGrid({ tracks }) {
  return (
    <>
      {tracks && tracks.length ? (
        <>
          <table className="w-full text-white">
            <tbody className="">
              {tracks.map((track, index) => (
                <tr
                  key={track.id}
                  className="hover:bg-slate-700 cursor-pointer"
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div className="flex items-center">
                      <span className="mr-4">{index + 1}</span>
                      <div className="h-10 w-10 flex-shrink-0">
                        {track.album.images.length && track.album.images[0] ? (
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
                      <div className="ml-4">
                        <div className="font-semibold">{track.name}</div>
                        {track.album.artists.map((artist, index) => (
                          <span
                            key={artist.id}
                            className="text-xs text-gray-300"
                          >
                            {artist.name}
                            {index < track.album.artists.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                    <div className="">{track.album.name}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <div className="">{formatDuration(track.duration_ms)}</div>
                    {/* <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                    Active
                  </span> */}
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
