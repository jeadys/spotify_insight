'use client'

type Props = {
  children: React.ReactNode
}

export default function CardGrid({ children }: Props) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 5xl:grid-cols-6 6xl:grid-cols-6">
      {children}
    </ul>
  )
}
