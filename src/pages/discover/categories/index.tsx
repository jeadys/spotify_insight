import { SectionWrapper } from "../../../components";
import { getCategories } from "../../../spotify";
import CategoryGrid from "../../../components/grid/CategoryGrid";
import { ICategories } from "../../../lib/interfaces/categories";
import { useQuery } from "react-query";

export default function Categories() {
  const fetchCategories = async () => {
    const categories = await getCategories();
    return categories.data;
  };

  const {
    data: categories,
    isLoading: categoriesIsLoading,
    error: categoriesError,
  } = useQuery<ICategories>("categories", fetchCategories, {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {categories && (
        <>
          <SectionWrapper title="Categories" breadcrumb="true">
            <CategoryGrid items={categories.categories.items} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
