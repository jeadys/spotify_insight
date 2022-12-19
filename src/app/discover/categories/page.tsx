import SectionWrapper from '@/components/core/SectionWrapper'
import CategoryGrid from '@/components/grid/CategoryGrid'
import CategoryGridSkeleton from '@/components/skeleton/CategoryGridSkeleton'
import { getCategories } from '@/server/api'

export default async function Categories() {
  const categories = await getCategories(50)

  return (
    <>
      {categories ? (
        <>
          <SectionWrapper title="Categories">
            <CategoryGrid categories={categories.categories.items} />
          </SectionWrapper>
        </>
      ) : (
        <CategoryGridSkeleton amount={50} />
      )}
    </>
  )
}
