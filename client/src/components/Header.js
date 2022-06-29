import React from "react";

export default function Header({ data, artist }) {
  return (
    <>
      {data.images.length && data.images[0] ? (
        <img
          className="w-96 h-96 flex-shrink-0 mx-auto rounded-md"
          src={data.images[0].url}
          alt={data.name}
        />
      ) : (
        <img
          className="w-96 h-96 flex-shrink-0 mx-auto rounded-md"
          src="/images/nocover.webp"
          alt={data.name}
        />
      )}
      <p className="text-white text-center my-5 font-black text-md">
        <span className="block text-2xl"> {data.name}</span>
        <span>
          {artist ? (
            <>{data.genres[0] ? data.genres[0] : "N/A"}</>
          ) : (
            <>
              {data.tracks.total.toLocaleString()}{" "}
              {`song${data.tracks.total !== 1 ? "s" : ""}  `}
            </>
          )}
        </span>
      </p>
    </>
  );
}
