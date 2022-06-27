export default function ArtistGrid({ artists }) {
  return (
    <>
      {artists && artists.length ? (
        <>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 5xl:grid-cols-6 6xl:grid-cols-6">
            {artists.map((artist) => (
              <li
                key={artist.id}
                className="col-span-1 flex flex-col text-center bg-slate-800 rounded-lg shadow hover:bg-slate-700 transition ease-in-out cursor-pointer"
              >
                <div className="flex-1 flex flex-col p-8">
                  <img
                    className="w-32 h-32 flex-shrink-0 mx-auto rounded-full"
                    src={artist.images[0].url}
                    alt={artist.name}
                  />
                  <h3 className="mt-6 text-white text-sm font-medium">
                    {artist.name}
                  </h3>
                  <dl className="mt-1 flex-grow flex flex-col justify-between">
                    <dt className="sr-only">Title</dt>
                    <dd className="text-gray-300 text-sm italic">
                      {artist.genres[0] ? artist.genres[0] : "N/A"}
                    </dd>
                    <dt className="sr-only">Role</dt>
                    <dd className="mt-3">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 rounded-full">
                        {`${artist.followers.total.toLocaleString()} followers`}
                      </span>
                    </dd>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p className="text-white justify-center content-center text-2xl">
            No artists available
          </p>
        </>
      )}
    </>
  );
}
