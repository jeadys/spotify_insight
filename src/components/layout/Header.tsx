'use client'

type Props = {
  children: React.ReactNode
}

export const Header = ({ children }: Props) => {
  return <header className="flex flex-col gap-3 pt-5 sm:pt-10">{children}</header>
}
