import { SectionWrapper } from "../components";
import { getCategories } from "../spotify";
import CategoryGrid from "../components/grid/CategoryGrid";
import { ICategories } from "../common/interfaces/categories";
import { useQuery } from "react-query";

export default function NewReleases() {
  const fetchCategories = async () => {
    const categories = await getCategories();
    return categories.data;
  };

  const {
    data: categories,
    isLoading: categoriesIsLoading,
    error: categoriesError,
  } = useQuery<ICategories>("categories", fetchCategories);

  return (
    <>
      {categories && (
        <>
          <SectionWrapper title="Categories" seeAll="/discover/categories">
            <CategoryGrid items={categories.categories.items} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
