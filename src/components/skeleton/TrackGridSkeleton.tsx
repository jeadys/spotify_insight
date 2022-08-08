import React, { ReactElement } from "react";

type Props = {
  amount: number;
};

export default function TrackGridSkeleton({ amount }: Props) {
  const tracks: ReactElement[] = [];

  for (let index = 0; index < amount; index++) {
    tracks.push(
      <span key={index} className="w-full flex flex-row p-4 gap-5 rounded-md animate-pulse">
        <span className="bg-gray-800 w-9 h-9 rounded-md"></span>
        <span className="bg-gray-800 h-9 flex-1 rounded-md"></span>
        <span className="album:hidden bg-gray-800 h-9 flex-1 rounded-md"></span>
        <span className="album:hidden bg-gray-800 h-9 flex-1 rounded-md"></span>
      </span>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-gray-800 w-44 h-8 rounded-md animate-pulse mb-4"></div>
      <div className="">{tracks}</div>
    </div>
  );
}
