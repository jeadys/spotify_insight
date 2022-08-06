import React from "react";

export default function ArtistHeaderSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col items-center">
        <div className="w-96 h-96 bg-gray-800"></div>
        <div className="w-96 h-24 bg-gray-800 mt-12"></div>
        <div className="h-5 w-5 mt-8 bg-gray-800"></div>
      </div>
      <div className="w-full flex gap-y-5 flex-col md:flex-row md:gap-x-20 justify-center mt-8 items-center">
        <div className="w-24 h-5 bg-gray-800"></div>
        <div className="w-24 h-5 bg-gray-800"></div>
        <div className="w-24 h-5 bg-gray-800"></div>
      </div>
    </div>
  );
}
