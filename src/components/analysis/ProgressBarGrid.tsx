'use client'

type Props = {
  children: React.ReactNode
}

export const ProgressBarGrid = ({ children }: Props) => {
  return <div className="grid grid-cols-1 gap-5 text-sm md:grid-cols-3">{children}</div>
}
