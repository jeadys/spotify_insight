'use client'

type Props = {
  children: React.ReactNode
}

export const ProgressBarGrid = ({ children }: Props) => {
  return <ul className="grid w-full grid-cols-2 items-start justify-start gap-5 gap-y-5 sm:grid-cols-3">{children}</ul>
}
