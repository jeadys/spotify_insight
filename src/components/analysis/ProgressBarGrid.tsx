'use client'

type Props = {
  children: React.ReactNode
}

export default function ProgressBarGrid({ children }: Props) {
  return <ul className="grid w-full grid-cols-2 items-start justify-start gap-5 gap-y-5 lg:grid-cols-3">{children}</ul>
}
