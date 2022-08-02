import { useQuery } from "react-query";

import { SectionWrapper } from "../../../components";
import CategoryGrid from "../../../components/grid/CategoryGrid";
import { ICategories } from "../../../lib/interfaces/categories";
import { getCategories } from "../../../lib/spotify";

export default function Categories() {
  const fetchCategories = async () => {
    const categories = await getCategories(50);
    return categories.data;
  };

  const { data: categories } = useQuery<ICategories>("categories", fetchCategories, {
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
