'use client'

type Props = {
  children: React.ReactNode
}

export const FeatureList = ({ children }: Props) => {
  return <ul className="grid w-full grid-cols-2 gap-5 sm:grid-cols-3">{children}</ul>
}
