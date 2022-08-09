import { useQuery } from "@tanstack/react-query";

import { SectionWrapper } from "../../../components/core";
import CategoryGrid from "../../../components/grid/CategoryGrid";
import { CategoryGridSkeleton } from "../../../components/skeleton";
import { ICategories } from "../../../lib/interfaces/categories";
import { getCategories } from "../../../lib/spotify";

export default function Categories() {
  const fetchCategories = async () => {
    const categories = await getCategories(50);
    return categories.data;
  };

  const { data: categories } = useQuery<ICategories>(["all-categories"], fetchCategories, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {categories ? (
        <>
          <SectionWrapper title="Categories" breadcrumb="true">
            <CategoryGrid items={categories.categories.items} />
          </SectionWrapper>
        </>
      ) : (
        <CategoryGridSkeleton amount={50} />
      )}
    </>
  );
}
