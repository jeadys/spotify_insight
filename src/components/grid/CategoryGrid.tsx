import Link from "next/link";

import { Categories } from "../../lib/interfaces/categories";

export default function CategoryGrid({ items }: Categories) {
  return (
    <>
      {items && items.length ? (
        <>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 5xl:grid-cols-6 6xl:grid-cols-6">
            {items.map((category) => (
              <li
                key={category.id}
                className="sm:bg-slate-800 rounded-lg sm:shadow sm:hover:bg-slate-700 transition ease-in-out"
              >
                <Link href={`/discover/categories/${category.id}`}>
                  <a className="py-4 flex flex-col items-center">
                    <img
                      src={
                        category.icons.length && category.icons[0]
                          ? category.icons[0].url
                          : "/images/nocover.webp"
                      }
                      className="w-48 h-48 object-cover rounded-md"
                      alt={category.name}
                    />

                    <h3 className="mt-6 text-white text-sm font-medium">{category.name}</h3>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p className="text-white justify-center content-center text-2xl">
            No categories available
          </p>
        </>
      )}
    </>
  );
}
