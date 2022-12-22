import { Suspense } from 'react'

import SectionWrapper from '@/components/core/SectionWrapper'
import CategoryGrid from '@/components/grid/CategoryGrid'
import CategoryGridSkeleton from '@/components/skeleton/CategoryGridSkeleton'
import { getCategories } from '@/server/api'

export default async function Categories() {
  const categories = await getCategories(50)

  return (
    <Suspense fallback={<CategoryGridSkeleton amount={50} />}>
      <SectionWrapper title="Categories">
        <CategoryGrid categories={categories.categories.items} />
      </SectionWrapper>
    </Suspense>
  )
}
