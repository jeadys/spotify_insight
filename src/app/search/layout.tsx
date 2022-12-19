import Search from '@/components/core/Search'

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <>
      <Search />
      {children}
    </>
  )
}
