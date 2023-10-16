'use client'

type Props = {
  children: React.ReactNode
}

export const TrackList = ({ children }: Props) => {
  return <ul className="w-full">{children}</ul>
}
