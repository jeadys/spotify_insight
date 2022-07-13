import { Link } from "react-router-dom";
import { Categories } from "../../common/interfaces/categories";

export default function CategoryGrid({ items }: Categories) {
  return (
    <>
      {items && items.length ? (
        <>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 5xl:grid-cols-6 6xl:grid-cols-6">
            {items.map((category) => (
              <li
                key={category.id}
                className="col-span-1 flex flex-col text-center bg-slate-800 rounded-lg shadow hover:bg-slate-700 transition ease-in-out cursor-pointer"
              >
                <Link to={`/categories/${category.id}`}>
                  <div className="flex-1 flex flex-col p-4">
                    {category.icons.length && category.icons[0] ? (
                      <img
                        className="w-42 h-42 flex-shrink-0 mx-auto rounded-md"
                        src={category.icons[0].url}
                        alt={category.name}
                      />
                    ) : (
                      <img
                        className="w-42 h-42 flex-shrink-0 mx-auto rounded-md"
                        src="images/nocover.webp"
                        alt={category.name}
                      />
                    )}
                    <h3 className="mt-6 text-white text-sm font-medium">
                      {category.name}
                    </h3>
                  </div>
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