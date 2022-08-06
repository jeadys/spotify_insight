import React from "react";

type Props = {
  amount: number;
};

export default function TrackGridSkeleton({ amount }: Props) {
  return (
    <div className="w-full">
      <div className="bg-gray-800 w-44 h-8 rounded-md animate-pulse mb-4"></div>
      <div className="">
        {Array.from(Array(amount), () => (
          <span className="w-full flex flex-row p-4 gap-5 rounded-md animate-pulse">
            <span className="bg-gray-800 w-9 h-9 rounded-md"></span>
            <span className="bg-gray-800 h-9 flex-1 rounded-md"></span>
            <span className="bg-gray-800 h-9 flex-1 rounded-md"></span>
            <span className="bg-gray-800 h-9 flex-1 rounded-md"></span>
          </span>
        ))}
      </div>
    </div>
  );
}
