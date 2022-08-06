import React from "react";

export default function TrackHeaderSkeleton() {
  return (
    <div className="mt-5">
      <div className="h-80 w-80 bg-gray-800"></div>

      <div className="gap-y-4 flex flex-col mt-5 mx items-center rounded-md">
        <div className="w-44 h-12 bg-gray-800 rounded-md"></div>
        <div className="w-44 h-4 bg-gray-800 rounded-md"></div>
        <div className="w-44 h-4 bg-gray-800 rounded-md"></div>
        <div className="w-52 h-10 bg-gray-800 mt-12 rounded-full"></div>
      </div>
    </div>
  );
}
