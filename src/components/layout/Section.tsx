'use client'

import { useProfileFilterStore } from '@/store/useProfileFilter'

type Props = {
  title: string
  description?: string
  showTerm?: boolean
  children: React.ReactNode
}

export default function Section({ title, description, showTerm, children }: Props) {
  const termDescription = useProfileFilterStore((state) => state.description)

  return (
    <section>
      <header className="sticky top-0 z-10 bg-gray-1300 py-2 capitalize text-white sm:py-5">
        <h2 className="text-2xl font-black sm:text-3xl">{title}</h2>
        <h3 className="line-clamp-1 break-all text-gray-300">
          {description} {showTerm && termDescription}
        </h3>
      </header>
      {children}
    </section>
  )
}
