import { useState, useEffect, useRef } from "react";
import { searchItems } from "../spotify";
import useDebounce from "../hooks/useDebounce";
import { ChooseTrack, PlayTrack } from "./TrackContext";
import { Link } from "react-router-dom";
import { stopProp } from "../lib/utils";
import { Track } from "../lib/interfaces/searchTrack";

export default function Search() {
  const [searchModal, setSearchModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Track[]>([]); // CHECK IF THIS IS CORRECT
  const trackUris = searchResults.map((track) => track.uri);
  const debouncedSearch = useDebounce(search, 1000);
  const inputRef = useRef<HTMLInputElement>(null);
  const playingTrack = PlayTrack();
  const chooseTrack = ChooseTrack();

  useEffect(() => {
    return searchModal ? inputRef.current!.focus() : setSearch(""); // && inputRef.current !== null ?
  }, [searchModal]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchData = await searchItems(debouncedSearch);
        setSearchResults(searchData.data.tracks.items);
      } catch (e) {
        console.log(e);
      }
    };

    if (debouncedSearch) {
      fetchData();
    } else {
      return setSearchResults([]);
    }
  }, [debouncedSearch]);

  return (
    <>
      <svg
        onClick={() => setSearchModal(!searchModal)}
        className="cursor-pointer top-3.5 left-4 h-7 w-7 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>

      {searchModal && (
        <div className="relative z-10" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity"></div>

          <div
            className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20"
            onClick={() => setSearchModal(!searchModal)}
          >
            <div
              className="mx-auto max-w-xl transform overflow-hidden rounded-xl bg-slate-800 text-white shadow-2xl transition-all"
              onClick={(e) => stopProp(e)}
            >
              <div className="relative">
                <svg
                  className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="text"
                  value={search}
                  ref={inputRef}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-white placeholder-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  role="combobox"
                  aria-expanded="false"
                  aria-controls="options"
                />
              </div>

              <ul
                className="max-h-96 scroll-py-2 overflow-y-auto py-2 text-sm text-white"
                id="options"
                role="listbox"
              >
                {searchResults.map((result) => (
                  <li
                    className={`${
                      playingTrack === result.uri
                        ? "bg-sky-600"
                        : "hover:bg-slate-700 cursor-pointer"
                    } px-4 py-2`}
                    key={result.id}
                    onClick={() => chooseTrack(trackUris, result.uri)}
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        {result.album.images.length &&
                        result.album.images[0] ? (
                          <img
                            className="h-10 w-10 object-cover rounded-md"
                            src={result.album.images[0].url}
                            alt={result.name}
                          />
                        ) : (
                          <img
                            className="h-10 w-10 object-cover rounded-md"
                            src="/images/nocover.webp"
                            alt={result.name}
                          />
                        )}
                      </div>

                      <div className="ml-4">
                        <div className="font-semibold">{result.name}</div>
                        <Link
                          to={`/albums/${result.album.id}`}
                          onClick={(e) => stopProp(e)}
                        >
                          <div className="hover:underline">
                            {result.album.name}
                          </div>
                        </Link>
                        <>
                          {result.artists.map((artist, index) => (
                            <span
                              key={artist.id}
                              className="text-xstext-gray-300 hover:underline"
                            >
                              <Link
                                to={`/artists/${artist.id}`}
                                onClick={(e) => stopProp(e)}
                              >
                                {artist.name}
                              </Link>

                              {index < result.artists.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {searchResults.length <= 0 && (
                <p className="p-4 text-sm text-gray-500">
                  No tracks or artists found.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
