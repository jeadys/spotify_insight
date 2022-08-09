import { ReactElement } from "react";

type Props = {
  amount: number;
};

export default function CategoryGridSkeleton({ amount }: Props) {
  const categories: ReactElement[] = [];

  for (let index = 0; index < amount; index++) {
    categories.push(
      <div key={index} className="sm:bg-slate-800 rounded-lg shadow">
        <div className="py-4 gap-6 flex flex-col items-center">
          <div className="bg-gray-700 w-48 h-48 rounded-md"></div>
          <div className="bg-gray-700 w-32 h-3 rounded-md"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-pulse">
      <div className="bg-gray-800 w-44 h-8 rounded-md mb-10"></div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 5xl:grid-cols-6 6xl:grid-cols-6">
        {categories}
      </div>
    </div>
  );
}
