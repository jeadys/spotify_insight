import Image from "next/image";
import Link from "next/link";

import { Categories } from "../../lib/interfaces/categories";

export default function CategoryGrid({ items }: Categories) {
  return (
    <>
      {items && items.length ? (
        <>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 5xl:grid-cols-6 6xl:grid-cols-6">
            {items.map((category) => (
              <li
                key={category.id}
                className="bg-slate-800 rounded-lg shadow hover:bg-slate-700 transition ease-in-out cursor-pointer"
              >
                <Link href={`/discover/categories/${category.id}`}>
                  <a className="py-4 flex flex-col items-center">
                    <Image
                      src={
                        category.icons.length && category.icons[0]
                          ? category.icons[0].url
                          : "/images/nocover.webp"
                      }
                      className="object-cover rounded-md"
                      width={192}
                      height={192}
                      layout="fixed"
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
