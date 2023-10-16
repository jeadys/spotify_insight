'use client'

type Props = {
  children: React.ReactNode
}

export const TrackListItem = ({ children }: Props) => {
  return <li className="group flex items-center gap-5 rounded-md p-2 hover:bg-gray-1200">{children}</li>
}
