import React from "react";
import { useQuery } from "react-query";
import { ITrackHeader } from "../common/interfaces/trackHeader";
import { getTrackAudioFeatures } from "../spotify";

export default function TrackHeader({ data }: ITrackHeader) {
  const audioFeatures: string[] = data.tracks.items.map((item) => item.id);

  const fetchTrackAudioFeatures = async () => {
    const trackAudioFeatures = await getTrackAudioFeatures(audioFeatures);
    return trackAudioFeatures.data;
  };

  const { data: trackAudioFeatures } = useQuery(
    "audio-features",
    fetchTrackAudioFeatures
  );

  console.log(trackAudioFeatures);

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
            By {data.owner?.display_name}
          </span>
        )}

        {data.tracks && data.tracks !== undefined && (
          <div className="text-sm text-white font-semibold">
            {data.tracks.total < 50 ? data.tracks.total : "50"} tracks
          </div>
        )}

        <span className="bg-green-600 text-white max-w-fit py-2 px-5 mx-auto rounded-full cursor-pointer my-5 font-semibold">
          Get recommendations
        </span>
      </div>
    </>
  );
}
