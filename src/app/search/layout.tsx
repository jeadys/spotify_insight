import { Search } from '@/components/layout/Search'
import { Section } from '@/components/layout/Section'

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <>
      <Section title="Browse catalog" description="Find artists, albums and tracks">
        <Search />
      </Section>
      {children}
    </>
  )
}
