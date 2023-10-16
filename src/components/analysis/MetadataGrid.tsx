'use client'

type Props = {
  children: React.ReactNode
}

export const MetadataGrid = ({ children }: Props) => {
  return <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 5xl:grid-cols-6">{children}</ul>
}
