'use client'

type Props = {
  children: React.ReactNode
}

export default function FeatureList({ children }: Props) {
  return <ul className="grid w-full grid-cols-2 gap-5 lg:grid-cols-3">{children}</ul>
}
