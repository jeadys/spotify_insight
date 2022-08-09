import Link from "next/link";

import { Categories } from "../../lib/interfaces/categories";
import DiscoverButton from "../button/DiscoverButton";

export default function CategoryGrid({ items }: Categories) {
  return (
    <>
      {items && items.length ? (
        <>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 5xl:grid-cols-6 6xl:grid-cols-6">
            {items.map((category) => (
              <li
                key={category.id}
                className="sm:bg-slate-800 rounded-lg sm:shadow sm:hover:bg-slate-700 transition ease-in-out overflow-hidden"
              >
                <Link href={`/discover/categories/${category.id}`}>
                  <a className="flex flex-col gap-5">
                    <h3 className="mt-6 text-white text-lg font-extrabold m-10">{category.name}</h3>
                    <img
                      src={
                        category.icons.length && category.icons[0]
                          ? category.icons[0].url
                          : "/images/nocover.webp"
                      }
                      className="w-28 h-28 -mr-4 rotate-12 place-self-end"
                      alt={category.name}
                    />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <DiscoverButton titleMessage="No categories found" buttonMessage="Discover new tracks" />
      )}
    </>
  );
}
