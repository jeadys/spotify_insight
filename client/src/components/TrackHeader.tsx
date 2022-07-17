import { ITrackHeader } from "../common/interfaces/trackHeader";
import { Link, useLocation } from "react-router-dom";
import { getYear } from "../utils";

export default function TrackHeader({ data }: ITrackHeader) {
  const { pathname } = useLocation();

  return (
    <>
      {data.images.length && data.images[0] ? (
        <img
          className="w-96 h-96 object-cover rounded-md mt-5 mx-auto"
          src={data.images[0].url}
          alt={data.name}
        />
      ) : (
        <img
          className="w-96 h-96 object-cover rounded-md mt-5 mx-auto"
          src="/images/nocover.webp"
          alt={data.name}
        />
      )}
      <div className="gap-y-2 flex flex-col mt-5">
        <div className="text-2xl md:text-4xl font-black text-white">
          {data.name}
        </div>

        {data.owner && data.owner !== undefined && (
          <span className="text-sm text-slate-400">
            By {data.owner.display_name}
          </span>
        )}

        {data.release_date && data.release_date !== undefined && (
          <span className="text-sm text-slate-400">
            Released in {getYear(data.release_date)}
          </span>
        )}

        {data.tracks && data.tracks !== undefined && (
          <div className="text-sm text-white font-semibold">
            {data.tracks.total < 50 ? data.tracks.total : "50"} tracks
          </div>
        )}

        {pathname == `/playlists/${data.id}` && (
          <Link
            to={`/recommendations/${data.id}`}
            className="bg-green-600 text-white max-w-fit py-2 px-5 mx-auto rounded-full cursor-pointer my-5 font-semibold"
          >
            Get recommendations
          </Link>
        )}

        {pathname == `/albums/${data.id}` && (
          <div className="my-5">
            <span className="text-2xl font-black text-blue-400">
              {data.popularity}%
            </span>
            <span className="text-lg font-semibold text-white block">
              Popularity
            </span>
          </div>
        )}
      </div>
    </>
  );
}
