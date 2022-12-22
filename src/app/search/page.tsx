import { Suspense } from 'react'

import SectionWrapper from '@/components/core/SectionWrapper'
import CategoryGrid from '@/components/grid/CategoryGrid'
import CategoryGridSkeleton from '@/components/skeleton/CategoryGridSkeleton'
import { getCategories } from '@/server/api'

export default async function page() {
  const categories = await getCategories(50)

  return (
    <Suspense fallback={<CategoryGridSkeleton amount={6} />}>
      <SectionWrapper title="Browse all">
        <CategoryGrid categories={categories.categories.items} />
      </SectionWrapper>
    </Suspense>
  )
}
