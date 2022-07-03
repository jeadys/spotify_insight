import React from "react";
import { IHeader } from "../common/interfaces/header";

export default function Header({ data }: IHeader) {
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
          {data.tracks && data.tracks !== undefined && (
            <>
              {data.tracks.total.toLocaleString()}{" "}
              {`song${data.tracks.total !== 1 ? "s" : ""}  `}
            </>
          )}
          {data.genres && data.genres !== undefined && (
            <>{data.genres[0] ? data.genres[0] : ""}</>
          )}
        </span>
      </p>
    </>
  );
}
