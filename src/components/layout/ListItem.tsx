'use client'

type Props = {
  children: React.ReactNode
}
export const ListItem = ({ children }: Props) => {
  return <li className="flex flex-row items-center gap-5 sm:flex-col sm:items-start">{children}</li>
}
