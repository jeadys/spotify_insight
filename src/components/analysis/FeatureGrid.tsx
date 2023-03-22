'use client'

type Props = {
  children: React.ReactNode
}

export default function FeatureGrid({ children }: Props) {
  return <ul className="mt-12 grid w-full grid-cols-2 gap-5 lg:grid-cols-3">{children}</ul>
}
